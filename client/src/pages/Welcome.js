import React from 'react';
import Button from '@material-ui/core/Button';
import { logout } from '../store/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Welcome = ({ logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
};

Welcome.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  logout
})(Welcome);
