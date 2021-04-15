const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// Like
exports.recordingAvailable = catchAsync(async (req, res, next) => {
  console.log(req.body);

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {}
  });
});
