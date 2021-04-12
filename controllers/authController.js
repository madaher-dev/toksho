const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //works only if production is https

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// This will handle existing but unverified email (delete and recreate)
exports.checkExisting = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next();
  else if (!user.verified || !user.handler) {
    await User.deleteOne({ email: req.body.email });
    return next();
  }
  return next(new AppError('Email already exists.', 401));
});

exports.resendEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const confirmToken = user.createEmailConfirmToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  const message =
    'Please use the following code to validate your email:\n\n' +
    `${confirmToken}.\n`;

  const html_message =
    `<p> Please use the following code to validate your email:\n\n` +
    `<p>${confirmToken}.\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Confirm your Email',
      message,
      html_message
    });

    user.password = undefined;

    res.status('200').json({
      status: 'success',
      data: {
        user: user
      }
    });
  } catch (err) {
    await user.remove();

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.password,
    dob: req.body.dob
  });

  const confirmToken = newUser.createEmailConfirmToken();

  await newUser.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  const message =
    'Please use the following code to validate your email:\n\n' +
    `${confirmToken}.\n`;

  const html_message =
    `<p> Please use the following code to validate your email:\n\n` +
    `<p>${confirmToken}.\n`;

  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Confirm your Email',
      message,
      html_message
    });

    newUser.password = undefined;

    res.status('200').json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    await newUser.remove();

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.validateEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    verified: true,
    handler: { $exists: true }
  });

  let result = true;
  if (user) {
    result = false;
  }

  res.status(200).json({
    status: 'success',
    success: result
  });
});

exports.checkHandler = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ handler: req.body.handler });
  let result = true;
  if (user) result = false;

  res.status(200).json({
    status: 'success',
    success: result
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({
    $or: [{ email }, { handler: email }]
  }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3) Check if email verified
  if (!user.verified) {
    res.status('200').json({
      status: 'success',
      data: {
        user
      }
    });
  } else createSendToken(user, 200, res);
  // 4) If everything ok, send token to client
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;

  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exist.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  //needs protect before it to have access to currentUser
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on Posted email

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { handler: req.body.email }]
  });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/reset/${resetToken}`;
  const message =
    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
    `${resetURL}.\n` +
    `If you didn't forget your password, please ignore this email!`;
  const html_message =
    '<p> You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
    `<a href="${resetURL}">${resetURL}</a>\n` +
    `If you didn't forget your password, please ignore this email!</p>`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 1 hr)',
      message,
      html_message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); //use save to run through middleware and validators

  // 3) Update changedPasswordAt property for the user
  // done using pre save middleware in the Model

  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password'); //id comes from protect middleware

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { emailConfirmToken: req.body.code },
    { verified: true, emailConfirmToken: null },
    { new: true }
  );

  if (!user) {
    return next(new AppError('Invalid code or email does not exist!', 401));
  } else createSendToken(user, 200, res);
});

exports.checkEmailToken = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  // Remove password from output
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
exports.setHandler = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      handler: req.body.handler
    },
    { new: true }
  );

  if (!user) {
    return next(new AppError('Invalid handler or email does not exist!', 401));
  } else
    res.status('200').json({
      status: 'success',
      data: {
        user
      }
    });
});
exports.deleteCookie = catchAsync(async (req, res, next) => {
  const token = '';
  const cookieOptions = {
    expires: new Date(Date.now() + 1),
    httpOnly: true
  };
  if (process.env.SECURE_TOKEN === 'true') cookieOptions.secure = true;
  else cookieOptions.secure = false;

  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    status: 'success',

    data: {
      token
    }
  });
});
