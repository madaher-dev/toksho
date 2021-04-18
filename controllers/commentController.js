const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Debate = require('../models/debateModel');
const Comment = require('./../models/commentModel');
const Pusher = require('pusher');

// Pusher

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

// Get all comments for a single debate

exports.getAllComments = catchAsync(async (req, res, next) => {
  //127.0.0.1:8000/api/v1/resource?sort=price,-duration&duration[gte]=5&difficulty=easy
  //-price for desending
  //,duration as a second sorting operator in case of tie

  const features = new APIFeatures(Comment.find(), {
    debate: req.params.debate
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const filteredComments = await features.query; //7ikmet rabina

  // Send responce
  res.status(200).json({
    status: 'success',
    data: {
      comments: filteredComments
    }
  });
});

// Add comment to a debate

exports.addComment = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.debate = req.params.debate;
  const newComment = await Comment.create(req.body);

  const comment = await Comment.findById(newComment._id).populate({
    path: 'user',
    select: 'name photo handler'
  });

  pusher.trigger('comments', 'new-comment', {
    comment: comment
  });

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {
      comment: comment
    }
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.comment);

  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }

  pusher.trigger('comments', 'delete-comment', {
    comment: comment
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
