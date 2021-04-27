const multer = require('multer');
const aws = require('aws-sdk');
var multerS3 = require('multer-sharp-s3');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const s3 = new aws.S3();
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-3'
});

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

exports.updateMe = catchAsync(async (req, res, next) => {
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
  const filteredBody = filterObj(req.body, 'photo', 'bio', 'firstLogin');

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

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
