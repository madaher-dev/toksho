import React from 'react';
import { ConferenceRoom } from '@voxeet/react-components';
const Conference = ({ debate, admin, user }) => {
  const invitedUsers = debate.guests.map(guest => {
    let rObj = {};
    rObj.name = guest.name;
    rObj.externalId = guest._id;
    rObj.invited = true;
    return rObj;
  });
  invitedUsers.push({
    name: debate.user.name,
    externalId: debate.user._id,
    invited: true
  });

  if (user.photo === 'null') user.photo = 'default-profile.png';
  const userInfo = {
    name: user.name,
    externalId: user._id,
    avatarUrl: `/static/images/avatars/${user.photo}`
  };
  const settings = {
    consumerKey: process.env.REACT_APP_VOXEET_CONSUMER_KEY,
    consumerSecret: process.env.REACT_APP_VOXEET_CONSUMER_SECRET,
    conferenceAlias: debate._id
  };

  return (
    <ConferenceRoom
      autoJoin
      consumerKey={settings.consumerKey}
      consumerSecret={settings.consumerSecret}
      conferenceAlias={settings.conferenceAlias}
      isWidget={false}
      //invitedUsers={invitedUsers}
      isAdmin={admin}
      liveRecordingEnabled={true}
      autoRecording
      userInfo={userInfo}
      //conferenceReplayId={debate._id}
    />
  );
};

export default Conference;
