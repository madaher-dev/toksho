const mongoose = require('mongoose');
const slugify = require('slugify');

const notificationSchema = mongoose.Schema(
  {
    notType: String,
    createdAt: {
      type: Date,
      default: Date.now()
      // select: false //does not return field in select query
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    source: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    debate: {
      type: mongoose.Schema.ObjectId,
      ref: 'Debate'
    }
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// crushSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'sourceId targetId',
//     select: '-__v -passwordChangedAt'
//   });

//   next();
// });
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
