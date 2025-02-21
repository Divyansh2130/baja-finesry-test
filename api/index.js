const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Input must be an array"
            });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Find highest alphabet (case insensitive)
        let highestAlphabet = '';
        if (alphabets.length > 0) {
            highestAlphabet = alphabets.reduce((highest, current) => {
                return current.toUpperCase() > highest.toUpperCase() ? current : highest;
            });
        }

        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

// Optional: Basic GET endpoint for API health check
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});