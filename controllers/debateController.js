const AppError = require('../utils/appError');
const Debate = require('../models/debateModel');
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
