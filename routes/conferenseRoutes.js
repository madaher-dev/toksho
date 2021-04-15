const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router
  .route('/recording/available')
  .get(conferenceController.recordingAvailable);

module.exports = router;
