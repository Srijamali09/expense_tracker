const express = require('express');
const router = express.Router();

router.post('/categorise', async (req, res) => {
  try {
    const { description } = req.body;
    const text = description.toLowerCase();

    let category = 'Other';

    if (text.match(/zomato|swiggy|food|restaurant|pizza|burger|biryani|coffee|tea|eat|lunch|dinner|breakfast|snack/)) {
      category = 'Food';
    } else if (text.match(/uber|ola|auto|bus|train|metro|fuel|petrol|diesel|cab|taxi|travel|flight|ticket/)) {
      category = 'Transport';
    } else if (text.match(/amazon|flipkart|shopping|clothes|shirt|shoes|dress|myntra|meesho|buy|purchase/)) {
      category = 'Shopping';
    } else if (text.match(/movie|netflix|spotify|game|concert|party|entertainment|hotstar|prime|youtube/)) {
      category = 'Entertainment';
    } else if (text.match(/doctor|hospital|medicine|pharmacy|health|gym|fitness|medical|clinic/)) {
      category = 'Health';
    } else if (text.match(/course|book|school|college|tuition|education|udemy|learning|class/)) {
      category = 'Education';
    } else if (text.match(/electricity|water|rent|wifi|internet|phone|mobile|bill|recharge|subscription/)) {
      category = 'Bills';
    }

    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;