import React from 'react';
//import { Player } from 'video-react';
import ReactPlayer from 'react-player';
//import '../../assets/scss/styles/scss/video-react.scss';

const PlayerFrame = ({ url }) => {
  return <ReactPlayer url={url} controls playing />;
};

export default PlayerFrame;
