require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendVerificationEmail = require("../email/template/UserCreation");

const APP_URL = process.env.APP_URL;

async function generateUniqueCode() {
  const generateCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  let code;
  let exists = true;

  while (exists) {
    code = generateCode();
    const [rows] = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE code = ?",
      [code]
    );
    exists = rows[0].count > 0;
  }

  return code;
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = await generateUniqueCode();

    const user = await db.query(
      "INSERT INTO users (name, email, active, code, password) VALUES (?, ?, ?, ?, ?)",
      [name, email, false, code, hashedPassword]
    );

    if (!user) {
      return res.status(500).json({ message: "Failed to register user" });
    }

    await sendVerificationEmail(email, name, APP_URL + "/verify/" + code);
    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ message: "Email already exists" });
    await db.query("DELETE FROM users WHERE email = ?", [email]);
    return res.status(500).json({ message: "Database error" });
  }
});

router.get("/verify/:code", async (req, res) => {
  const { code } = req.params;

  if (!code) return res.status(400).json({ message: "Code is required" });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE code = ?", [code]);

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    if (rows[0].active)
      return res.status(400).json({ message: "User already verified" });

    await db.query("UPDATE users SET active = 1, code = NULL WHERE code = ?", [
      code,
    ]);
    res.status(200).json({ message: "User verified successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Database error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });
    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });
    if (!user.active)
      return res.status(400).json({ message: "User not verified" });
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Database error" });
  }
});

router.patch("/update-username/:id", async (req, res) => {
  const { username, expiresIn } = req.body;
  const { id } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Update username in the database
    const [updateResult] = await db.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [username, id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch updated user details
    const [users] = await db.query(
      "SELECT id, email, name FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found after update" });
    }

    const updatedUser = users[0];

    // Generate new token with updated username
    const token = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
      process.env.JWT_SECRET,
      { expiresIn: expiresIn }
    );

    res
      .status(200)
      .json({ message: "Username updated successfully", token: token });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email exists in the database
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = rows[0];

    // Generate a unique password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Create a JWT token with user information
    const token = jwt.sign(
      { 
        email: user.email, 
        id: user.id, 
        resetToken: resetToken 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Store the reset token and expiry in the database
    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?", 
      [resetToken, resetTokenExpiry, email]
    );

    // Create a password reset link
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    // Email options with a styled HTML template
    const mailOptions = {
      from: `"NutriCycle" <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #f4f4f4;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #EFBFB3;
              color: #000;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer { font-size: 0.8em; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hello,</p>
            <p>You have requested to reset your password for your NutriCycle account. Click the button below to reset your password:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>This link will expire in 1 hour.</p>
            <div class="footer">
              <p>© ${new Date().getFullYear()} NutriCycle. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Add a route to verify the reset token
router.get("/verify-reset-token", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token exists in the database and hasn't expired
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > ?", 
      [decoded.email, decoded.resetToken, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Return user email for frontend to use
    res.status(200).json({ 
      message: "Token is valid", 
      email: decoded.email 
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token has expired" });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token exists in the database and hasn't expired
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > ?", 
      [decoded.email, decoded.resetToken, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const user = rows[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?", 
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token has expired" });
    }
    console.error('Password reset error:', err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
