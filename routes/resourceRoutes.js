const express = require('express');
const router = express.Router();

const resourceController = require('../controllers/resourceController');
const reviewRouter = require('./../routes/reviewRoutes');
const authController = require('./../controllers/authController');

// A Middleware that runs only when there is a parameter

router.param('id', resourceController.checkID);

//Reviews middleware -mounting router not controller
router.use('/:tourId/reviews', reviewRouter);

// Top 5 implementing Aliasing
router
  .route('/top-5')
  .get(resourceController.aliasTop, resourceController.getAllResources);

// Stats implementing aggregate
router.route('/stats').get(resourceController.resourceStats);

// Monthly Plan implementing aggregate Unwinding and Projecting

router
  .route('/plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    resourceController.resourcePlan
  );

router
  .route('/')
  .get(resourceController.getAllResources)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    resourceController.validateBody,
    resourceController.createResource
  );

router
  .route('/:id/:optional?')
  .get(resourceController.getResource)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    resourceController.updateResource
  )
  .delete(resourceController.deleteResource);

module.exports = router;
