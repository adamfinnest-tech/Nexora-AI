const Brain = require('../models/Brain');

exports.getMemories = async (req, res) => {
  try {
    const memories = await Brain.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMemory = async (req, res) => {
  try {
    const { key, value, category, importance } = req.body;
    const newMemory = await Brain.create({
      userId: req.user._id,
      key,
      value,
      category,
      importance,
      fact: `${key}: ${value}` // Auto-generate fact for the LLM to read easily
    });
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMemory = async (req, res) => {
  try {
    const { key, value, category, importance } = req.body;
    const memory = await Brain.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { key, value, category, importance, fact: `${key}: ${value}` },
      { new: true, runValidators: true }
    );
    if (!memory) return res.status(404).json({ message: 'Memory not found' });
    res.status(200).json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Brain.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!memory) return res.status(404).json({ message: 'Memory not found' });
    res.status(200).json({ message: 'Memory deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
