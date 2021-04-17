// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Debate = require('./debateModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!']
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    debate: {
      type: mongoose.Schema.ObjectId,
      ref: 'Debate',
      required: [true, 'Comment must belong to a Debate.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//commentSchema.index({ debate: 1, user: 1 }, { unique: true });

commentSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo handler'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
