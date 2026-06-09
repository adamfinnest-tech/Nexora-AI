const express = require('express');
const router = express.Router();
const { getMemories, createMemory, updateMemory, deleteMemory } = require('../controllers/memoryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMemories)
  .post(protect, createMemory);

router.route('/:id')
  .put(protect, updateMemory)
  .delete(protect, deleteMemory);

module.exports = router;
