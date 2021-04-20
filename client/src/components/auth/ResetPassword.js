import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, Redirect, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

import {
  checkToken,
  resetPass,
  setLoading
} from '../../store/actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  main: {
    paddingTop: 20
  },

  text: {
    textAlign: 'center'
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const ResetPassword = ({
  checkToken,
  setLoading,
  resetPass,
  user,
  isAuthenticated,
  loading,
  error
}) => {
  // Pull Token from URL
  let { email_token } = useParams();

  // Check Token on load
  useEffect(() => {
    setLoading();
    checkToken(email_token);
  }, [email_token, setLoading, checkToken]);

  const classes = useStyles();

  const errorPage = <Redirect to="/login" />;

  // Form page if token is correct
  const formPage = (
    <Grid item container xs={12} sm={4} alignItems="center" justify="center">
      {user ? (
        <div>
          <Link to="/">
            <VoiceChatIcon fontSize="large" color="primary" />
          </Link>
          <Typography>Reset password for {user.email}</Typography>
        </div>
      ) : (
        <Fragment></Fragment>
      )}

      <Grid item xs={12} sm={8}>
        <Formik
          initialValues={{
            password: '',
            passwordConfirm: ''
          }}
          validate={values => {
            const errors = {};

            if (!values.password) {
              errors.password = 'Please enter a password';
            } else if (values.password.length < 8) {
              errors.password = 'Password should be at least 8 characters';
            }
            if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = 'Passwords do not match!';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              setLoading();
              resetPass(values, email_token);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Confirm Password"
                  name="passwordConfirm"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Reset Password
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else if ((user && !user.verified) || (user && !user.handler)) {
    return <Redirect to="/notverified" />;
  } else {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.main}
      >
        {error ? errorPage : formPage}
      </Grid>
    );
  }
};

ResetPassword.propTypes = {
  resetPass: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  checkToken: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.users.loading,
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error
});

export default connect(mapStateToProps, {
  resetPass,
  setLoading,
  checkToken
})(ResetPassword);
