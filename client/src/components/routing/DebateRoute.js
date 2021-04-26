import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import { checkUser, setPusher } from '../../store/actions/userActions';
import NoAuthDebate from '../../views/Debate/NoAuthDebate';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const DebateRoute = ({
  isAuthenticated,
  loading,
  page,
  checkUser,
  setPusher,
  pusher,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      checkUser();
    }
    if (!pusher) {
      console.log('Pusher Connection Created!');
      const pusher = new Pusher('3112d5ae0257895cff95', {
        cluster: 'eu',
        encrypted: true
      });
      setPusher(pusher);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && !loading ? (
          <Component page={page} {...props} />
        ) : loading ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <NoAuthDebate />
        )
      }
    />
  );
};

DebateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  checkUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, { checkUser, setPusher })(DebateRoute);
