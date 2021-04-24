import React from 'react';
import ReactLivestream from 'react-livestream';

// Optional component to be rendered
// when you're not streaming
function OfflineComponent() {
  return (
    <div>
      <p>I am offline now, but checkout my stream on Fridays at 5 PM EST</p>
    </div>
  );
}

const Test = () => {
  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const youtubeChannelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
  console.log(youtubeApiKey);
  return (
    <div>
      <ReactLivestream
        platform="youtube"
        youtubeApiKey={youtubeApiKey}
        youtubeChannelId={youtubeChannelId}
        offlineComponent={<OfflineComponent />}
      />
    </div>
  );
};

export default Test;
