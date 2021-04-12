import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkUser } from '../../store/actions/userActions';
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
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      checkUser();
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
  loading: state.users.loading
});

export default connect(mapStateToProps, { checkUser })(DebateRoute);
