import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { checkUser, setPusher } from '../../store/actions/userActions';
import Pusher from 'pusher-js';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import {
  pushLike,
  pushNewDebate,
  pushChallenge,
  pushReady,
  pushEnded,
  pushLive,
  pushNotification
} from '../../store/actions/debateActions';

import { pushPick } from '../../store/actions/profileActions';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const PrivateRoute = ({
  isAuthenticated,
  loading,
  page,
  checkUser,
  setPusher,
  pushNotification,
  pusher,
  user,
  pushLike,
  pushEnded,
  pushNewDebate,
  pushChallenge,
  pushPick,
  pushReady,
  pushLive,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      checkUser();
    }
    if (!pusher && user) {
      const pusher = new Pusher('3112d5ae0257895cff95', {
        cluster: 'eu',
        encrypted: true,
        authEndpoint: '/api/v1/users/pusher/auth'
      });
      console.log('Pusher Connection Created!');
      var privateChannel = pusher.subscribe(`private-${user.handler}`);
      privateChannel.bind('notification', data => {
        pushNotification(data);
      });
      const channel = pusher.subscribe('debates');
      //var privateChannel = pusher.subscribe(`private-${user.handler}`);

      channel.bind('like', data => {
        let newData = {};
        newData.data = data;
        pushLike(newData);
      });

      channel.bind('new-debate', data => {
        let newData = {};
        newData.data = data;
        pushNewDebate(newData);
      });

      channel.bind('challenge', data => {
        let newData = {};
        newData.data = data;
        pushChallenge(newData);
      });

      channel.bind('pick', data => {
        let newData = {};
        newData.data = data;
        pushPick(newData);
      });
      channel.bind('ready', data => {
        let newData = {};
        newData.data = data;
        pushReady(newData);
      });
      channel.bind('joined', data => {
        let newData = {};
        newData.data = data;
        pushLive(newData);
      });
      channel.bind('ended', data => {
        let newData = {};
        newData.data = data;
        pushEnded(newData);
      });

      setPusher(pusher);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && !loading ? (
          <Component {...props} page={page} />
        ) : loading ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  checkUser: PropTypes.func.isRequired,
  setPusher: PropTypes.func.isRequired,
  pushNotification: PropTypes.func.isRequired,
  pushEnded: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  pusher: state.users.pusher,
  user: state.users.user
});

export default connect(mapStateToProps, {
  checkUser,
  setPusher,
  pushLike,
  pushNewDebate,
  pushChallenge,
  pushReady,
  pushEnded,
  pushLive,
  pushPick,
  pushNotification
})(PrivateRoute);
