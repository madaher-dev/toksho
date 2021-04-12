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
router.route('/user/:handler').get(debateController.getDebatesByHandler);
router.route('/challengers/:id').get(debateController.getChallengers);
router.route('/debate/:id').get(debateController.getSingleDebate);
//Protect all routes after this middleware
router.use(authController.protect);

router.route('/my').get(debateController.myDebates);
router.route('/challenge/:debate').get(debateController.challenge);
router.route('/withdraw/:debate').get(debateController.withdraw);
router.route('/like/:debate').get(debateController.like);
router.route('/unlike/:debate').get(debateController.unlike);
router.route('/ready/:debate').get(debateController.setReady);
router.route('/challengers/pick').post(debateController.pick);
router.route('/challengers/unpick').post(debateController.unpick);

module.exports = router;
