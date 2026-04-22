const express = require('express');
const router = express.Router();

router.post('/categorise', async (req, res) => {
  try {
    const { description } = req.body;
    const categories = [
      'Food', 'Transport', 'Shopping', 'Entertainment',
      'Health', 'Education', 'Bills', 'Other'
    ];
    const prompt = `Given this expense description: "${description}", which category does it belong to? Choose exactly one from: ${categories.join(', ')}. Reply with just the category name, nothing else.`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const category = data.candidates[0].content.parts[0].text.trim();
    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;