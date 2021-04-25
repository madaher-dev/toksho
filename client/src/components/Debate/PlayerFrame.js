import React from 'react';
import { Player } from 'video-react';
import '../../assets/scss/styles/scss/video-react.scss';

const PlayerFrame = ({ url }) => {
  return (
    <Player>
      <source src={url} />
    </Player>
  );
};

export default PlayerFrame;
