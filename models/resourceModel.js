const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const resourceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Resouce must have a name'],
      unique: true,
      maxlength: [40, 'A Resource name must be less than 40 characters!'],
      minlength: [5, 'A Resource name must have more than 5 characters!'],
      validate: [
        validator.isAlpha,
        'A resource name must only contain characters'
      ] //method from validator package considers space not alpha
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    price: {
      type: Number,
      required: [true, 'A Resource must have a price']
    },
    discount: {
      type: Number,
      validate: {
        validator: function(val) {
          //Custom validator only works on NEW document creation
          return val < this.price; //retirns boolean
        },
        message: `Discount ({VALUE}) cannot be more than price`
      }
    },
    summary: {
      type: String,
      trim: true //remove white space in beg and end
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false //does not return field in select query
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy or medium or difficult'
      }
    },
    startDates: [Date],
    slug: String,
    secretResource: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    //guide: Array (if you need to embedd/ check pre save middleware)
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    }
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true }
  }
);

resourceSchema.virtual('durationweeks').get(function() {
  //info not persistent in database but calculated on query , cannot be used in queries
  return this.duration / 7;
});

// Parent Referencing Virtual populate
resourceSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', //name of reference field in Review model
  localField: '_id' //name of reference in local Model
});
//Embedding guides in Tour Schema
// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

//Document Middleware runs before .save() and .create() commands but not on .insertMany()
resourceSchema.pre('save', function(next) {
  //pre save hook
  this.slug = slugify(this.name, { lower: true });
  next();
});

resourceSchema.pre('save', function(next) {
  //pre save can be used more than once
  console.log('Will Save Document!');
  next();
});

resourceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });

  next();
});

resourceSchema.index({ price: 1, ratingsAverage: -1 });
resourceSchema.index({ slug: 1 });

resourceSchema.post('save', function(doc, next) {
  //access to finished document
  console.log(doc);
  next();
});
// Query middlewre
resourceSchema.pre(/^find/, function(next) {
  //resourceSchema.pre('find', function(next) {
  //runs before find queries
  this.find({ secretResource: { $ne: true } });
  this.start = Date.now();
  next();
});
resourceSchema.post(/^find/, function(docs, next) {
  const time = Date.now() - this.start;
  console.log(`The query took ${time} milliseconds!`);
  next();
});
//Aggregation Middleware
resourceSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretResource: { $ne: true } } }); //unshift adds at beginning of array - adding match pre aggregate
  next();
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
