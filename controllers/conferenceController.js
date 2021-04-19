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
  var token_url = 'https://api.voxeet.com/v1/auth/token';
  var session_url = `https://api.voxeet.com/v2/conferences/mix/${conference.confId}/rtmp/start`;
  var username = process.env.VOXEET_CONSUMER_KEY;
  var password = process.env.VOXEET_CONSUMER_SECRET;
  //var basicAuth = 'Basic ' + btoa(username + ':' + password);

  const body = {
    uri: `rtmp://a.rtmp.youtube.com/live2/${process.env.YOUTUBE_STREAM_KEY}`
  };

  let data = qs.stringify({
    grant_type: 'client_credentials'
  });

  try {
    // await axios.post(session_url, body, {
    //   headers: { Authorization: +basicAuth }
    // });
    // const res1 = await axios.post(
    //   token_url,
    //   { grant_type: 'client_credentials' },
    //   {
    //     auth: {
    //       username: username,
    //       password: password
    //     },
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   }
    // );
    let config = {
      method: 'post',
      url: 'https://api.voxeet.com/v1/auth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: username,
        password: password
      },
      data: data
    };

    const res1 = await axios(config);

    console.log('Token Log Log', res1);

    const token = res1.access_token;

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const res2 = await Axios.post(session_url, body, config);
    console.log(res2);
  } catch (error) {
    console.log(error);
  }
};
