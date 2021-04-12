const AppError = require('../utils/appError');
const Debate = require('../models/debateModel');
const User = require('./../models/userModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createDebate = catchAsync(async (req, res, next) => {
  req.body.user = req.user;
  const newDebate = await Debate.create(req.body);

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