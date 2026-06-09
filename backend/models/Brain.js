const mongoose = require('mongoose');

const brainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fact: {
    type: String,
    required: false
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Personal'
  },
  importance: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Brain', brainSchema);
