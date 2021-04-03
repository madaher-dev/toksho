const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
router.post('/signup', authController.checkExisting, authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/checkResetToken/:token', authController.checkEmailToken);
router.post('/validateEmail', authController.validateEmail);
router.post('/resendEmail', authController.resendEmail);
router.post('/confirmEmail', authController.confirmEmail);
router.post('/checkHandler', authController.checkHandler);
router.get('/deleteCookie', authController.deleteCookie);
router.post('/getProfile', userController.getProfile);
//Protect all routes after this middleware
router.use(authController.protect);

router.post('/setHandler', authController.setHandler);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe); //actually patching
router.patch(
  '/uploadAvatar',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch('/updateBio', userController.updateMe);

//Restrict all the middleware after this point to admin
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
