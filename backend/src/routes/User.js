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
  
  // Input validation
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
   
    if (rows.length === 0) {
      return res.status(404).json({ message: "No account associated with this email" });
    }

    const user = rows[0];
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    
    // Create JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        resetToken: resetToken
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [resetToken, resetTokenExpiry, email]
    );

    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: process.env.MAIL_PORT === '465',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
            body{font-family:'Poppins',sans-serif;margin:0;padding:0;color:#4a4a4a;background-color:#f5f5f5;line-height:1.6}
            .container{max-width:600px;margin:0 auto;background-color:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05)}
            .header{background-color:#34A853;padding:30px 20px;text-align:center}
            .logo-container{margin-bottom:15px}
            .welcome-text{color:white;font-size:22px;font-weight:600;margin:0;text-shadow:0 1px 2px rgba(0,0,0,0.1)}
            .content{padding:35px 30px}
            h2{color:#34A853;font-size:24px;margin-top:0;border-bottom:2px solid #f0f0f0;padding-bottom:12px}
            .message{background-color:#f8f9fa;border-left:4px solid #34A853;padding:15px;margin:20px 0;border-radius:0 8px 8px 0}
            .button-container{text-align:center;margin:30px 0}
            .button{display:inline-block;background-color:#34A853;color:#000;text-decoration:none;padding:12px 30px;border-radius:50px;font-weight:500;box-shadow:0 4px 6px rgba(239,191,179,0.2);transition:all 0.3s}
            .button:hover{background-color:#2d9249;box-shadow:0 6px 8px rgba(52,168,83,0.3)}
            .link-fallback{text-align:center;margin:20px 0;padding:15px;background-color:#f8f9fa;border-radius:8px;word-break:break-all;font-size:13px;color:#666}
            .expiry-note{font-size:14px;color:#888;font-style:italic;text-align:center;margin-top:25px}
            .divider{height:1px;background-color:#f0f0f0;margin:30px 0}
            .signature{font-weight:500;color:#34A853}
            .footer{padding:20px;text-align:center;color:#888;font-size:12px;background-color:#f9f9f9;border-top:1px solid #eee}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <img src="${process.env.APP_URL}/src/assets/nutricare.svg" alt="NutriCycle" height="50" />
                </div>
                <div class="welcome-text">Password Reset Request</div>
            </div>
            <div class="content">
                <h2>Hello, ${user.name || 'User'}!</h2>
                
                <div class="message">
                    You have requested to reset your password for your NutriCycle account.
                </div>
                
                <p>Click the button below to reset your password:</p>
                
                <div class="button-container">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </div>
                
                <div class="link-fallback">
                    If the button doesn't work, copy and paste this link:
                    <br>${resetLink}
                </div>
                
                <div class="expiry-note">
                    This password reset link will expire in 1 hour for security reasons.
                </div>
                
                <div class="divider"></div>
                
                <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
                
                <p>Best regards,<br><span class="signature">The NutriCycle Team</span></p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} NutriCycle. All rights reserved.</p>
                <p>Questions? Contact us at <a href="mailto:support@nutricycle.com" style="color:#34A853;">support@nutricycle.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: `"NutriCycle" <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: 'Password Reset Request',
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "Password reset link sent to your email",
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Forgot password error:', err);
    
    if (err.code === 'EAUTH') {
      return res.status(500).json({ 
        message: "Email service authentication failed. Please try again later." 
      });
    } else if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ 
        message: "Unable to connect to email service. Please try again later." 
      });
    }

    return res.status(500).json({ 
      message: "An unexpected error occurred. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

router.get("/verify-reset-token", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > ?", 
      [decoded.email, decoded.resetToken, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > ?", 
      [decoded.email, decoded.resetToken, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const user = rows[0];

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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
