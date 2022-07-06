const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/RefreshToken');

router.get('/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;
