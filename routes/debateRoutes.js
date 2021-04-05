const express = require('express');

const router = express.Router();

const debateController = require('../controllers/debateController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(debateController.getAllDebates)
  .post(
    authController.protect,
    debateController.validateBody,
    debateController.createDebate
  );

module.exports = router;
