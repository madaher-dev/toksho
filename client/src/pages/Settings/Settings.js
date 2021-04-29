import React from 'react';

import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import NavPills from '../../material/NavPills/NavPills.js';
import Camera from '@material-ui/icons/Camera';

import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import Social from './Social';

const Settings = () => {
  return (
    <GridContainer style={{ paddingTop: 10, width: '100%', paddingLeft: 20 }}>
      <GridItem>
        <h3>Settings</h3>
      </GridItem>
      <GridItem sm={12} md={6}>
        <NavPills
          color="primary"
          tabs={[
            {
              tabIcon: Camera,
              tabButton: 'User Info',
              tabContent: <UserInfo /> //debates={debates} loading={loading} />
            },
            {
              tabButton: 'Social',
              tabIcon: Camera,
              tabContent: <Social />
            },
            {
              tabButton: 'Password',
              tabIcon: Camera,
              tabContent: <ChangePassword />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Settings;
