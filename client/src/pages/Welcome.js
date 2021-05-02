import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as PusherPushNotifications from '@pusher/push-notifications-web';
import AvatarModal from '../components/auth/AvatarModal';
import UserDrawer from '../components/layout/UserDrawer';
import HomePage from './Lounge/HomePage';
import NotFound from './NotFound';
import AuthProfile from '../views/ProfilePage/ProfilePage.js';
import MyDebates from './MyDebates/MyDebates';
import Debate from './Debate/Debate';
import Watch from './Watch/Watch';
import Settings from './Settings/Settings';
import Notifications from './Notifications/Notifications';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  content: {
    flexGrow: 1,
    paddingTop: 0,
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 240
    },

    paddingLeft: 56
  }
}));
const Welcome = ({ user, page, profile, match }) => {
  const classes = useStyles();

  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  useEffect(() => {
    if (user.firstLogin) {
      setOpenAvatarModal(true);
    }
  }, [user]);
  // const beamsClient = new PusherPushNotifications.Client({
  //   instanceId: '3bcc43d3-a33b-4400-9548-00e7ac20d202'
  // });
  // const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  //   url: '/api/v1/users/beams/token'
  // });

  // useEffect(() => {
  //   beamsClient
  //     .start()
  //     .then(() => beamsClient.setUserId(user._id, beamsTokenProvider))

  //     .catch(console.error);
  // }, []);
  const handleClose = () => {
    setOpenAvatarModal(false);
  };

  return (
    <div className={classes.content}>
      <UserDrawer />

      <div />
      {page === 'home' ? (
        <HomePage />
      ) : page === 'profile' ? (
        <AuthProfile profile={profile} />
      ) : page === 'mydebates' ? (
        <MyDebates />
      ) : page === 'debate' ? (
        <Debate match={match} />
      ) : page === 'watch' ? (
        <Watch />
      ) : page === 'settings' ? (
        <Settings />
      ) : page === 'notifications' ? (
        <Notifications />
      ) : (
        <NotFound />
      )}

      <AvatarModal open={openAvatarModal} handleClose={handleClose} />
    </div>
  );
};

Welcome.propTypes = {
  user: PropTypes.object,
  page: PropTypes.string.isRequired,
  profile: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps, {})(Welcome);
