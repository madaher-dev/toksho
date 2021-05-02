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
router.post('/getProfileByHandler', userController.getProfileByHandler);
router.get('/profiles/:profile', userController.getProfile);
//Protect all routes after this middleware
router.use(authController.protect);

router.post('/setHandler', authController.setHandler);
router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.delete('/deleteMe', userController.deleteMe); //actually patching
router.patch(
  '/updateInfo',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateInfo
);
router.patch('/updateBio', userController.updateInfo);
router.post('/pusher/auth', userController.getPusherToken);
router.get(
  '/myNotifications',
  userController.clearNotifications,
  userController.myNotifications
);

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
