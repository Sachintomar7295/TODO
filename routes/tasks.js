const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

// नया todo add करने के लिए POST route
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description जरूरी है' });
    }

    const task = new Task({
      description,
      owner: req.user._id,
      completed: false
    });

    await task.save();
    res.status(201).json(task); // नया task वापस भेजो
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;



//new joda he
