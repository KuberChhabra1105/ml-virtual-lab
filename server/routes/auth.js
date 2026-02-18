const express = require('express');
const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
    // Mock Logic
    const { username, password } = req.body;
    res.json({ message: "User created", user: { username } });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    // Mock Logic
    const { username, password } = req.body;
    res.json({
        token: "dummy-jwt-token",
        user: { username: username || "Student" }
    });
});

module.exports = router;
