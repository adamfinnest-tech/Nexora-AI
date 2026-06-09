const express = require('express');
const router = express.Router();
const { connectIntegration, getConnectedIntegrations } = require('../controllers/integrationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/connect', protect, connectIntegration);
router.get('/', protect, getConnectedIntegrations);

module.exports = router;
