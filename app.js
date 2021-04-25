const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const debateRouter = require('./routes/debateRoutes');
const conferenceRouter = require('./routes/conferenseRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

//Let's Encrypt

var pkg = require('./package.json');
var Greenlock = require('greenlock-express');
var greenlock = Greenlock.init({
  packageRoot: __dirname,
  configDir: './greenlock.d',

  maintainerEmail: 'madaher@gmail.com',

  cluster: false
}).serve(app);

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
  max: 1000,
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

// Pusher

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
//Logger

app.use(
  require('connect-logger')({
    /* options */
  })
);

// 2-Routes
app.get('/', (req, res) => res.json({ msg: 'Welcome to Toksho API' }));

app.use('/api/v1/debates', debateRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/conference', conferenceRouter);
app.use('/api/v1/comments', commentRouter);

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
