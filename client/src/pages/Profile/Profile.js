import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProfilePage from '../../views/ProfilePage/ProfilePage';
import Welcome from '../Welcome';

import { checkUser, setLoading } from '../../store/actions/userActions';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Profile = ({
  checkUser,
  isAuthenticated,
  match,
  setLoading,
  loading
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading();
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isAuthenticated && !loading ? (
        <Welcome page="profile" profile={match.params.handler} />
      ) : loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ProfilePage profile={match.params.handler} />
      )}
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading
});

export default connect(mapStateToProps, {
  checkUser,
  setLoading
})(Profile);
