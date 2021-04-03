const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  handler: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true
  },
  photo: String,
  bio: String,
  dob: Date,
  password: {
    type: String,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    validate: {
      // Custom Validator - This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailConfirmToken: String,
  verified: {
    type: Boolean,
    default: false
  },
  firstLogin: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined; //passwordConfirm is required input but not required to be persistent in db
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //saving might need more time than issuing the token
  next();
});

//dont show inactive (deleted) accounts

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  //create a token
  const resetToken = crypto.randomBytes(32).toString('hex');
  //encrypt the token
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  //save encrypted in DB and send user the unencrypted version
  return resetToken;
};

//Create a reset password token
userSchema.methods.createEmailConfirmToken = function() {
  //create a token
  const confirmToken = crypto.randomBytes(3).readUInt16LE();
  //encrypt the token before saving it to database - send unencrypted to user
  this.emailConfirmToken = confirmToken;

  // console.log({ resetToken }, this.passwordResetToken);

  return confirmToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
