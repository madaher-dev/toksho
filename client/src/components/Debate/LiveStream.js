import React from 'react';
import ReactLivestream from 'react-livestream';

// Optional component to be rendered
// when you're not streaming
function OfflineComponent({ schedule }) {
  return (
    <div>
      <p>This debate have not started yet! Check out again on {schedule}</p>
    </div>
  );
}

const LiveStream = ({ schedule }) => {
  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const youtubeChannelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  return (
    <div>
      <ReactLivestream
        platform="youtube"
        youtubeApiKey={youtubeApiKey}
        youtubeChannelId={youtubeChannelId}
        offlineComponent={<OfflineComponent schedule={schedule} />}
      />
    </div>
  );
};

export default LiveStream;
