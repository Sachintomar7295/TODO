const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create Task
router.post('/', async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get All Tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

// Update Task
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      owner: req.user._id 
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;