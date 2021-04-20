import React from 'react';
import { Redirect } from 'react-router';
const NotAuthProfile = () => {
  return <Redirect to={`/`} />;
};

export default NotAuthProfile;
