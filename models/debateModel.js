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
    topics: [String],
    language: {
      type: String,
      enum: {
        values: ['English', 'عربي', 'Français'],
        message: 'Unsupported Language'
      }
    },
    duration: {
      type: String,
      enum: {
        values: ['30 mins', '45 mins', '1 hr'],
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Debate must belong to a user']
    }
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

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;
