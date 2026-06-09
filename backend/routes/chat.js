const express = require('express');
const router = express.Router();
const { createChat, getChats, getChatById, addMessage, deleteChat } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createChat)
  .get(protect, getChats);

router.route('/:id')
  .get(protect, getChatById)
  .delete(protect, deleteChat);

router.route('/:id/message')
  .post(protect, addMessage);

module.exports = router;
