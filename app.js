const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const resourceRouter = require('./routes/resourceRoutes');
const userRouter = require('./routes/userRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
const debateRouter = require('./routes/debateRoutes');
// const transactionRouter = require('./routes/transactionRoutes');

const app = express();
// 1- Global Middleware
// Enable Proxy
app.enable('trust proxy');

// Implementing cors (Access-Control-Allow *)
//  can sepcify origin
//  app.use(cors({
//   origin: 'https://myapp.com'
// }));

//app.use(cors());

//for patch and delete
//app.options('*', cors());

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Use Compression
// app.use(compression);
//Static Files
//app.use(express.static('assets'));
app.use('/static', express.static(path.join(__dirname, 'assets')));
//app.use(express.static('client/build'));
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //100 requests from same IP per hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); //limit only API calls

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection - remove mongo operators from body
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compression
app.use(compression());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      //allows the following fields from being duplicate in the query
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

//request time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//Logger

// app.use(
//   require('connect-logger')({
//     /* options */
//   })
// );

// 2-Routes
// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to the Delivery App API' })
// );
// app.use('/api/v1/resource', resourceRouter);
app.use('/api/v1/debates', debateRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/tranactions', transactionRouter);
// app.use('/api/v1/reviews', reviewRouter);

// 3-Serving static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Error Handling

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
