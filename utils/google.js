const { google } = require('googleapis');
//const { auth } = require('google-auth-library');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-3'
});

const s3 = new aws.S3();

//const https = require('https');

// This part loads key from env rather than file

// const keysEnvVar = process.env['GOOGLE_CREDS'];
// if (!keysEnvVar) {
//   throw new Error('The $CREDS environment variable was not found!');
// }
// const keys = JSON.parse(keysEnvVar);

// This part authenticates from file

// const authentication = new google.auth.GoogleAuth({
//   keyFile: `./${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
//   scopes: [
//     'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube'
//   ]
// });

// Authenticate from file (KEY File)
// const authClient = await authentication.getClient();
// console.log(authClient);
// google.options({
//   auth: authClient
// });

// Authenticate from file (Not Key File)

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/callback'
);

//const { tokens } = await oauth2Client.getToken(process.env.GOOGLE_AUTH_CODE);
//console.log('s2:', tokens);

// const tokens = {
//   access_token: process.env.GOOGLE_ACCESS_TOKEN,
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN
// };
//oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates

oauth2Client.setCredentials({
  //access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  //forceRefreshOnFailure
});

google.options({ auth: oauth2Client });

// Authenticate from env
// const client = auth.fromJSON(keys);
// client.scopes = [
//   'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload'
// ];

// google.options({
//   auth: client
// });

// Initiate Api
var youtube = google.youtube('v3');

exports.downloadVideo = async (
  url,
  title,
  description,
  defaultLanguage,
  debate
) => {
  // Download Video

  const response = await fetch(url);
  const buffer = await response.buffer();

  fs.writeFile(`temp.mp4`, buffer, () =>
    console.log('finished downloading video!')
  );

  // var myChannels = await youtube.channels.list({
  //   part: 'id,snippet,status',
  //   mine: true
  // });
  // console.log(myChannels);
  // Upload Video TO
  const fileName = 'temp.mp4';
  const fileSize = fs.statSync(fileName).size;
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'toksho-videos',
    Metadata: { Title: title, Description: description },
    Key: debate + '.' + 'mp4',
    Body: fileContent
  };

  // Uploading files to the bucket

  const location = s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    result = data.location;
    return result;
  });

  return location;
  //UPLOADING VIDEO TO YOUTUBE
  //const fileName = 'temp.mp4';
  //const fileSize = fs.statSync(fileName).size;
  // const res = await youtube.videos.insert(
  //   {
  //     part: 'id,snippet,status',
  //     notifySubscribers: true,
  //     requestBody: {
  //       snippet: {
  //         title,
  //         description
  //         //defaultLanguage
  //       },
  //       status: {
  //         privacyStatus: 'private'
  //       }
  //     },
  //     media: {
  //       body: fs.createReadStream(fileName)
  //     }
  //   },
  //   {
  //     // Use the `onUploadProgress` event from Axios to track the
  //     // number of bytes uploaded to this point.
  //     onUploadProgress: evt => {
  //       const progress = (evt.bytesRead / fileSize) * 100;
  //       readline.clearLine(process.stdout, 0);
  //       readline.cursorTo(process.stdout, 0, null);
  //       process.stdout.write(`${Math.round(progress)}% complete`);
  //     }
  //   }
  // );
  // console.log('\n\n');
  // console.log(res.data);
  // return res.data;
};

exports.scheduleBroadcast = async snippet => {
  try {
    const res = await youtube.liveBroadcasts.insert({
      part: 'id,snippet,status,contentDetails',
      requestBody: {
        snippet,
        contentDetails: { monitorStream: { enableMonitorStream: false } },
        status: { privacyStatus: 'public' }
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
