const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const debateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A Debate must have a title'],
      maxlength: [50, 'A Debate title must be less than 50 characters!'],
      minlength: [8, 'A Debate title must have more than 8 characters!']
    },
    synopsis: {
      type: String,

      maxlength: [280, 'A Debate synopsis must be less than 280 characters!']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    schedule: Date,
    endDate: Date,
    topics: [String],
    language: {
      type: String,
      enum: {
        values: ['English', 'عربي', 'Français'],
        message: 'Unsupported Language'
      }
    },
    status: {
      type: String,
      default: 'new'
    },
    duration: {
      type: String,
      enum: {
        values: [30, 45, 60],
        message: 'Unsupported Duration'
      }
    },
    slug: String,
    challengers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    guests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    joinedUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Debate must belong to a user']
    },
    voxeetID: String,
    voxeetOwnerId: String,
    voxeetDuration: Number,
    youtubeVideURL: String
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Document Middleware runs before .save() and .create() commands but not on .insertMany()
debateSchema.pre('save', function(next) {
  //pre save hook
  this.slug = slugify(this.title, { lower: true });
  next();
});

debateSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guests',
    select: 'name handler photo'
  });
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  debateSchema.pre('validate', function(next) {
    if (this.guests.length > 5) throw 'You can have a maximum of 5 guests!';
    next();
  });
  this.populate({
    path: 'user',
    select: 'name photo handler'
  });
  next();
});

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;
