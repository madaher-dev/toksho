import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkUser, setPusher } from '../../store/actions/userActions';
import Pusher from 'pusher-js';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
  setPusher: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, { checkUser, setPusher })(PrivateRoute);
