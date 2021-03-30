import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import {
  loginUser,
  setLoading,
  clearErrors
} from '../../store/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { setAlert } from '../../store/actions/alertActions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',

    height: '100vh'
  },
  title: {
    marginTop: 10,
    marginBottom: 10
  },
  field: {
    marginTop: 20,
    marginBottom: 20
  },
  roundedButton: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    marginTop: 20,
    backgroundColor: '#A74A5A',
    transition: 'ease',
    '&:hover': {
      backgroundColor: '#741b31'
    },

    '&:disabled': {
      cursor: 'default',
      opacity: 1
    },
    color: 'white',
    borderRadius: 25,
    textTransform: 'none',
    cursor: 'pointer',
    boxShadow: 'lightgray',
    height: 45
  },
  links: {
    //width: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    textDecoration: 'none'
  }
}));
const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),

  password: Yup.string().required('Password is required!')
});
const Login = ({
  loading,
  error,
  loginUser,
  isAuthenticated,
  user,
  setLoading,
  clearErrors,
  setAlert
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  if (isAuthenticated) {
    return <Redirect to="/welcome" />;
  } else if (user) {
    if (!user.verified || !user.handler) {
      return <Redirect to="/notverified" />;
    }
  } else {
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={3} container direction="column">
          <Grid item>
            <Link to="/">
              <VoiceChatIcon fontSize="large" color="primary" />
            </Link>
          </Grid>
          <Grid item className={classes.title}>
            <Typography variant="h4">Log in to TokSho</Typography>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);

                  setLoading();
                  loginUser(values);
                }, 500);
              }}
            >
              {({
                setFieldValue,
                values,
                submitForm,
                isSubmitting,
                touched,
                errors
              }) => (
                <Form>
                  <Box className={classes.field}>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email or Handler"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box className={classes.field}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Button
                    onClick={submitForm}
                    color="primary"
                    disabled={loading}
                    className={classes.roundedButton}
                    fullWidth
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item container className={classes.links}>
            <Grid item>
              <Typography>
                <Link
                  to="/forgot"
                  style={{ color: '#A74A5A', textDecoration: 'none' }}
                >
                  Forgot Password?{' '}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {' '}
            </Grid>
            <Grid item>
              <Typography>
                <Link
                  to="/signup/open"
                  style={{ color: '#A74A5A', textDecoration: 'none' }}
                >
                  {' '}
                  Sign up for TokSho
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  setLoading: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.users.error,
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  user: state.users.user
});

export default connect(mapStateToProps, {
  loginUser,
  setLoading,
  clearErrors,
  setAlert
})(Login);
