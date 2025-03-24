require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const sendVerificationEmail = require('../email/template/UserCreation');

const APP_URL = process.env.APP_URL;

async function generateUniqueCode() {
    const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

    let code;
    let exists = true;

    while (exists) {
        code = generateCode();
        const [rows] = await db.query('SELECT COUNT(*) as count FROM users WHERE code = ?', [code]);
        exists = rows[0].count > 0;
    }

    return code;
}

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

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
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists" });
        await db.query("DELETE FROM users WHERE email = ?", [email]);
        return res.status(500).json({ message: "Database error" });
    }
});

router.get("/verify/:code", async (req, res) => {
    const { code } = req.params;

    if (!code) return res.status(400).json({ message: "Code is required" });

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE code = ?", [code]);

        if (rows.length === 0) return res.status(404).json({ message: "User not found" });

        if (rows[0].active) return res.status(400).json({ message: "User already verified" });

        await db.query("UPDATE users SET active = 1, code = NULL WHERE code = ?", [code]);
        res.status(200).json({ message: "User verified successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "Database error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });
        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
        if (!user.active) return res.status(400).json({ message: "User not verified" });
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;