import React from 'react';
import { Redirect } from 'react-router';
const NoAuthDebate = () => {
  return <Redirect to={`/`} />;
};

export default NoAuthDebate;
