const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

//Get All comments for a single debate
router.route('/:debate').get(commentController.getAllComments);

//Protect all routes after this middleware
router.use(authController.protect);

router.route('/:debate').post(commentController.addComment);
router.route('/:comment').delete(commentController.deleteComment);

module.exports = router;
