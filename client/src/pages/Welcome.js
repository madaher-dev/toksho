import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AvatarModal from '../components/auth/AvatarModal';
import UserDrawer from '../components/layout/UserDrawer';
import HomePage from './Lounge/HomePage';
import NotFound from './NotFound';
import AuthProfile from '../views/ProfilePage/ProfilePage.js';
import MyDebates from './MyDebates/MyDebates';
import Debate from './Debate/Debate';

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
