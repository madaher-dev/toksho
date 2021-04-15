import React from 'react';
import { ConferenceRoom } from '@voxeet/react-components';
import '@voxeet/react-components/dist/voxeet-react-components.css';
const Voxeet = () => {
  const settings = {
    consumerKey: 'WZF9gs8QY4oQTcUKzZVqtQ==',
    consumerSecret: 'NpAb23wMZD2X90ERBMOFD31vTSfIhTNJ_ML4tVgCLFg=',
    conferenceAlias: 'Sample77'
  };

  return (
    <ConferenceRoom
      autoJoin
      consumerKey={settings.consumerKey}
      consumerSecret={settings.consumerSecret}
      conferenceAlias={settings.conferenceAlias}
      isWidget={false}
      //invitedUsers={invitedUsers}
      isAdmin
    />
  );
};

export default Voxeet;
