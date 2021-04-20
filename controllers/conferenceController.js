const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const axios = require('axios').default;
const qs = require('qs');

// Webhooks on events
exports.recordingAvailable = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { eventType, conference } = req.body;

  switch (eventType) {
    case 'Conference.Created':
      streamConference(conference);
      break;
    case 'Conference.Ended':
      //snackIcon = <Icon className={classes.icon}>{props.icon}</Icon>;
      break;

    case 'Recording.MP4.Available':
      //snackIcon = <Icon className={classes.icon}>{props.icon}</Icon>;
      break;
    default:
      snackIcon = null;
      break;
  }

  res.status(201).json({
    status: 'success',
    timestamp: req.requestTime,
    data: {}
  });
});

const streamConference = async conference => {
  //var basicAuth = 'Basic ' + btoa(username + ':' + password);
  var session_url = `https://api.voxeet.com/v2/conferences/mix/${conference.confId}/rtmp/start`;
  const body = {
    uri: `rtmp://a.rtmp.youtube.com/live2/${process.env.YOUTUBE_STREAM_KEY}`
  };

  try {
    const token = await authenticateVoxeet();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res2 = await axios.post(session_url, body, config);
    console.log(res2);
  } catch (error) {
    console.log(error);
  }
};

const authenticateVoxeet = async () => {
  var token_url = 'https://api.voxeet.com/v1/auth/token';
  var username = process.env.VOXEET_CONSUMER_KEY;
  var password = process.env.VOXEET_CONSUMER_SECRET;
  let data = qs.stringify({
    grant_type: 'client_credentials'
  });

  let config = {
    method: 'post',
    url: token_url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: username,
      password: password
    },
    data: data
  };

  try {
    const tokenResult = await axios(config);
    const token = tokenResult.data.access_token;
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
