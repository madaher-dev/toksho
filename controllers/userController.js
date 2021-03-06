const multer = require('multer');
const aws = require('aws-sdk');
var multerS3 = require('multer-sharp-s3');
const User = require('./../models/userModel');
const Notification = require('../models/notificationModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Pusher = require('pusher');
const APIFeatures = require('./../utils/APIFeatures');

// Pusher

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});
//const PushNotifications = require('@pusher/push-notifications-server');

// let beamsClient = new PushNotifications({
//   instanceId: process.env.BEAMS_INSTANCE_ID,
//   secretKey: process.env.BEAMS_PRIMARY_KEY
// });

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-3'
});

const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  ACL: 'public-read',
  Bucket: 'toksho-profile-pictures',
  Key: function(req, file, cb) {
    cb(null, req.user._id + '.' + 'jpg');
  },
  resize: {
    width: 500,
    height: 500
  },
  max: true
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.photo = req.file.Location;

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  const currentUser = await User.findById(req.user.id);

  if (!currentUser.handler) {
    return next(
      new AppError('The user belonging to this token no longer exist.', 401)
    );
  }
  next();
});

exports.updateInfo = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'photo',
    'bio',
    'name',
    'dob',
    'facebook',
    'twitter',
    'instagram',
    'linkedIn',
    'firstLogin'
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getProfileByHandler = catchAsync(async (req, res, next) => {
  const user = await User.findOne(
    { handler: req.body.profile },
    { name: 1, email: 1, handler: 1, photo: 1, bio: 1 }
  );

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const profile = req.params.profile;
  const user = await User.findById(profile, {
    name: 1,
    email: 1,
    handler: 1,
    photo: 1,
    bio: 1
  });

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

exports.getSearchUser = catchAsync(async (req, res, next) => {
  //127.0.0.1:8000/api/v1/resource?sort=price,-duration&duration[gte]=5&difficulty=easy
  //-price for desending
  //,duration as a second sorting operator in case of tie

  const features = new APIFeatures(User.find(), {
    $or: [
      { name: { $regex: req.query.q, $options: 'i' } },
      { handler: { $regex: req.query.q, $options: 'i' } },
      { bio: { $regex: req.query.q, $options: 'i' } }
    ]
    // page: 1 - can add different fileds to query object according to API Features
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let filteredUsers = await features.query; //7ikmet rabina

  filteredUsers = filteredUsers.map(({ _id, name, handler, photo, bio }) => ({
    id: _id,
    name,
    handler,
    photo,
    bio
  }));

  filteredUsers = filteredUsers.slice(0, 9);

  const searchField = {
    id: 9999999999999,
    name: `Search for "${req.query.q}"`,
    handler: req.query.q
  };
  filteredUsers.push(searchField);
  // Send responce
  res.status(200).json({
    status: 'success',
    data: {
      users: filteredUsers
    }
  });
});

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getPusherToken = (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  const presenceData = {
    user_id: req.user._id,
    user_info: { name: req.user.name, handler: req.user.handler }
  };

  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
};

exports.myNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({
    user: req.user._id
  })
    .sort({ createdAt: 'desc' })
    .populate({
      path: 'source',
      select: 'name photo handler'
    });

  res.status(200).json({
    status: 'success',
    data: notifications
  });
});

exports.clearNotifications = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    notifications: 0
  });

  next();
});
