const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router
  .route('/recording/available')
  .post(conferenceController.recordingAvailable);

module.exports = router;
