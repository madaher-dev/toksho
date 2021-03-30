import React from 'react';
import Spinner from '../layout/SpinnerPadded';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPlanner } from '../../actions/plannerActions';

const AdminRoute = ({
  isAuthenticated,
  loading,
  loadPlanner,
  isAdmin,
  component: Component,
  ...rest
}) => {
  React.useEffect(() => {
    // if (localStorage.token && !isAuthenticated) {
    //   loadPlanner();
    // }
    loadPlanner();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin && !loading ? (
          <Component {...props} />
        ) : !loading ? (
          <Redirect to='/planner' />
        ) : (
          <Spinner />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loadPlanner: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  isAdmin: state.planners.isAdmin,
  loading: state.planners.loading,
});

export default connect(mapStateToProps, { loadPlanner })(AdminRoute);
