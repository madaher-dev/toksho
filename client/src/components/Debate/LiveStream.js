import React from 'react';
import styled from 'styled-components';
import Moment from 'moment';

const StyledIframeWrapper = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
`;

const StyledIframe = styled.iframe`
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
`;

const LiveStream = ({ schedule }) => {
  const [isLive, setIsLive] = React.useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = React.useState(null);
  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const youtubeChannelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  React.useEffect(() => {
    console.log('hello');
    processYoutubeStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional component to be rendered
  // when you're not streaming
  function OfflineComponent({ schedule }) {
    return (
      <div>
        <p>
          The live stream of this debate will start on{' '}
          {Moment(schedule).format('LLLL')}
        </p>
      </div>
    );
  }

  function fetchYoutubeData() {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelId}&eventType=live&type=video&key=${youtubeApiKey}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(async res => {
        const response = await res.json();
        console.log('hello2');
        console.log(response);
        if (response.items && response.items.length > 0) {
          const streamInfo = response.items[0];
          setIsLive(true);
          setYoutubeVideoId(streamInfo.id.videoId);
        }
      })
      .catch(err => {
        console.log('Error fetching data from YouTube API: ', err);
      });
  }
  function processYoutubeStream() {
    if (youtubeChannelId && youtubeApiKey) {
      console.log('hello3');
      fetchYoutubeData();
    } else {
      console.error(
        '[react-livestream] YouTube support requires a youtubeApiKey and youtubeChannelId prop'
      );
    }
  }

  function embedIframe() {
    return (
      <StyledIframe
        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></StyledIframe>
    );
  }

  return isLive ? (
    <StyledIframeWrapper>{embedIframe()}</StyledIframeWrapper>
  ) : (
    <OfflineComponent schedule={schedule} />
  );
};

export default LiveStream;
