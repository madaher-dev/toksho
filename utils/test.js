const { google } = require('googleapis');
//const { auth } = require('google-auth-library');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const aws = require('aws-sdk');
const catchAsync = require('./../utils/catchAsync');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/callback'
);
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  forceRefreshOnFailure: true
});

google.options({ auth: oauth2Client });

// Initiate Api
var youtube = google.youtube('v3');

exports.downloadVideo = catchAsync(async (req, res, next) => {
  let date = new Date();
  date = date.toISOString();
  console.log(date);
  // Create Broadcast
  const snippet = {
    channelID: 'UCHMaOsFXyje6bz9WwFDdidQ',
    title: 'test',
    scheduledStartTime: date
  };
  const result = await youtube.liveBroadcasts.insert({
    part: 'id,snippet,status,contentDetails',
    requestBody: {
      snippet,
      contentDetails: {
        monitorStream: { enableMonitorStream: true },
        // enableEmbed: true,
        enableAutoStart: true,
        enableDvr: true
      },
      status: { privacyStatus: 'public' }
    }
  });

  const broadcastID = result.data.id;
  console.log(broadcastID);
  const snippet2 = {
    title: 'test title',
    description: 'test description'
  };
  const cdn = {
    frameRate: '30fps',
    ingestionType: 'rtmp',
    resolution: '1080p'
  };
  const result2 = await youtube.liveStreams.insert({
    part: 'id,snippet,status,contentDetails',
    requestBody: {
      snippet: snippet2,
      CDN: cdn
    }
  });

  // Send responce
  res.status(200).json({
    status: 'success',
    data: result2.data
  });
});
