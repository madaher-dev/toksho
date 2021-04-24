const AppError = require('../utils/appError');
const Debate = require('../models/debateModel');
const User = require('./../models/userModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Pusher = require('pusher');
//const google = require('../utils/google');

// Pusher

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

exports.createDebate = catchAsync(async (req, res, next) => {
  req.body.user = req.user;
  const newDebate = await Debate.create(req.body);

  pusher.trigger('debates', 'new-debate', {
    debate: newDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: newDebate
    }
  });
});

exports.getAllDebates = catchAsync(async (req, res, next) => {
  //127.0.0.1:8000/api/v1/resource?sort=price,-duration&duration[gte]=5&difficulty=easy
  //-price for desending
  //,duration as a second sorting operator in case of tie

  const features = new APIFeatures(Debate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const filteredDebates = await features.query; //7ikmet rabina

  // Send responce
  res.status(200).json({
    status: 'success',
    data: {
      debates: filteredDebates
    }
  });
});

exports.myDebates = catchAsync(async (req, res, next) => {
  //127.0.0.1:8000/api/v1/resource?sort=price,-duration&duration[gte]=5&difficulty=easy
  //-price for desending
  //,duration as a second sorting operator in case of tie

  const features = new APIFeatures(
    Debate.find({
      $or: [{ user: req.user._id }, { guests: req.user._id }]
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const filteredDebates = await features.query; //7ikmet rabina

  // Send responce
  res.status(200).json({
    status: 'success',
    data: {
      debates: filteredDebates
    }
  });
});

//Get Debates by handler
exports.getDebatesByHandler = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ handler: req.params.handler });
  const features = new APIFeatures(
    Debate.find({
      $or: [{ user: user._id }, { guests: user._id }]
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const filteredDebates = await features.query; //7ikmet rabina

  // Send responce
  res.status(200).json({
    status: 'success',
    data: {
      debates: filteredDebates
    }
  });
});

// Challenge
exports.challenge = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { $addToSet: { challengers: req.user._id } },
    { new: true }
  );

  pusher.trigger('debates', 'challenge', {
    debate: updatedDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// Withdraw

exports.withdraw = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { $pull: { challengers: req.user._id, guests: req.user._id } },
    { new: true }
  );

  pusher.trigger('debates', 'challenge', {
    debate: updatedDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// Like
exports.like = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

  pusher.trigger('debates', 'like', {
    debate: updatedDebate
  });

  //await google.getChannelList();
  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// Set debate as ready
exports.setReady = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { status: 'ready' },
    { new: true }
  );

  pusher.trigger('debates', 'ready', {
    debate: updatedDebate
  });
  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// Set debate as Ended and store voxeet info
exports.setEnded = catchAsync(async (id, voxeetID, voxeetOwnerId, duration) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: id },
    { status: 'ended', voxeetOwnerId, voxeetID, voxeetDuration: duration },
    { new: true }
  );

  pusher.trigger('debates', 'ended', {
    debate: updatedDebate
  });
});

// Store Youtube upload result in DB
exports.storeVideo = catchAsync(async (id, video) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: id },
    { status: 'videoReady', youtubeVideURL: video },
    { new: true }
  );
});

// Set debate as joined (Live)
exports.setJoined = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { status: 'joined', $addToSet: { joinedUsers: req.user._id } },
    { new: true }
  );

  pusher.trigger('debates', 'joined', {
    debate: updatedDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});
// UnLike
exports.unlike = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.params.debate },
    { $pull: { likes: req.user._id } },
    { new: true }
  );

  pusher.trigger('debates', 'like', {
    debate: updatedDebate
  });
  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// Pick
exports.pick = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.body.debate },
    { $addToSet: { guests: req.body.challenger } },
    { new: true }
  );

  if (updatedDebate.user._id.toString() != req.user._id.toString())
    return next(new AppError('You do not own this debate', 400));

  pusher.trigger('debates', 'pick', {
    debate: updatedDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

// UnPick
exports.unpick = catchAsync(async (req, res, next) => {
  const updatedDebate = await Debate.findOneAndUpdate(
    { _id: req.body.debate },
    { $pull: { guests: req.body.challenger } },
    { new: true }
  );
  if (updatedDebate.user._id.toString() != req.user._id.toString())
    return next(new AppError('You do not own this debate', 400));

  pusher.trigger('debates', 'pick', {
    debate: updatedDebate
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      debate: updatedDebate
    }
  });
});

//Get debate Challengers

exports.getChallengers = catchAsync(async (req, res, next) => {
  const debate = await Debate.findById(req.params.debate).populate({
    path: 'challengers',
    select: 'name email bio photo handler'
  });

  res.status(200).json({
    status: 'success',
    data: debate.challengers
  });
});

//Get debate Likes

exports.getLikers = catchAsync(async (req, res, next) => {
  const debate = await Debate.findById(req.params.debate).populate({
    path: 'likes',
    select: 'name email bio photo handler'
  });

  res.status(200).json({
    status: 'success',
    data: debate.likes
  });
});

// Get Single Debate

exports.getSingleDebate = factory.getOne(Debate, { path: 'user' });

// validate middleware

exports.validateBody = (req, res, next) => {
  if (!req.body.title) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing fields in body'
    });
  }
  next();
};
