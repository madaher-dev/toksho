import React, { useEffect } from 'react';
import { setAlert } from '../../store/actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  forgotPass,
  clearErrors,
  setLoading
} from '../../store/actions/userActions';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  forgotLink: {
    alignSelf: 'flex-end'
  },
  loginButton: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Login = ({
  forgotPass,
  isAuthenticated,
  error,
  clearErrors,
  setAlert,
  linkSent,
  setLoading,
  loading
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (error && !linkSent) {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [linkSent, error, setAlert, clearErrors]);

  useEffect(() => {
    if (linkSent) {
      setAlert(error, 'success');
      clearErrors();
    }
  }, [linkSent, setAlert, clearErrors, error]);

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else if (linkSent) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid
          item
          container
          xs={12}
          sm={4}
          className={classes.main}
          alignItems="center"
          justify="center"
        >
          <Link to="/">
            <VoiceChatIcon fontSize="large" color="primary" />
          </Link>
          <Typography>
            If you forget your password you can reset it by providing your
            registered email. You will receive a reset password link by email.
          </Typography>
          <Grid item xs={12} sm={8}>
            <Formik
              initialValues={{
                email: ''
              }}
              validate={values => {
                const errors = {};

                if (!values.email) {
                  errors.email = 'Please enter your email or handler';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  setLoading();
                  forgotPass(values);
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting, touched, errors }) => (
                <Form>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>

                  <Box margin={1}>
                    <Grid container>
                      <Grid item className={classes.loginButton}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          Send
                        </Button>
                      </Grid>
                      <Grid item className={classes.forgotLink}>
                        <Typography>
                          <Link
                            to="/login"
                            style={{ color: '#A74A5A', textDecoration: 'none' }}
                          >
                            Back to Login
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
            <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
Login.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  setAlert: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
  loading: state.users.loading,
  linkSent: state.users.linkSent
});

export default connect(mapStateToProps, {
  forgotPass,
  clearErrors,
  setAlert,
  setLoading
})(Login);
