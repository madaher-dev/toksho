import React, { useState } from 'react';
//import { setAlert } from '../store/actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  clearErrors,
  setLoading,
  resendEmail,
  verifyEmail,
  setHandler
} from '../store/actions/userActions';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import { default as TextFieldAlone } from '@material-ui/core/TextField';
import { Redirect, Link } from 'react-router-dom';
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
  },
  grow: {
    flexGrow: 1
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  field: {
    marginBottom: 10,
    marginTop: 10
  }
}));
const HandlerSchema = Yup.object().shape({
  handler: Yup.string()
    .min(3, 'Handler has to be longer than 3 characters!')
    .required('Required')
    .test(
      'handler-backend-validation', // Name
      'Handler has already been taken.', // Msg
      async handler => {
        // Res from backend will be flag at res.data.success, true for
        // username good, false otherwise
        const {
          data: { success }
        } = await axios.post('/api/v1/users/checkHandler', {
          handler: handler
        });

        return success;
      }
    )
});
const NotVerified = ({
  isAuthenticated,
  error,
  clearErrors,
  // setAlert,
  setLoading,
  loading,
  resendEmail,
  verifyEmail,
  setHandler,
  user,
  sent,
  step
}) => {
  const classes = useStyles();

  const sendEmail = e => {
    e.preventDefault();
    setLoading();
    resendEmail(user.email);
  };
  const [code, setCode] = useState('');

  const handleSetCode = e => {
    e.preventDefault();
    setCode(e.target.value);
  };
  const handleVerify = () => {
    verifyEmail(code);
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else if (user) {
    if (!user.verified || !user.handler) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          {step !== 3 ? (
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

              <Typography style={{ textAlign: 'center' }}>
                Welcome {user.email} Please confirm your email to login! If you
                did not receive an email from us you can try again.
              </Typography>
              <Grid
                item
                container
                direction="column"
                className={classes.buttons}
              >
                <Grid item>
                  <TextFieldAlone
                    autoFocus
                    margin="dense"
                    id="code"
                    label="Verification Code"
                    type="text"
                    variant="outlined"
                    width="150"
                    onChange={handleSetCode}
                  />
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleVerify}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    Verify
                  </Button>
                  <Button
                    color="primary"
                    disabled={sent || loading}
                    onClick={sendEmail}
                  >
                    Resend Email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Formik
              initialValues={{
                handler: ''
              }}
              validationSchema={HandlerSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  setLoading();
                  setHandler(values);
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
                  <Link to="/" className={classes.logo}>
                    <VoiceChatIcon fontSize="large" color="primary" />
                  </Link>
                  <Typography>
                    This will be your unique handler on TokSho
                  </Typography>

                  <Box className={classes.field}>
                    <Field
                      component={TextField}
                      name="handler"
                      type="text"
                      label="TokSho Handler"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>

                  <Button
                    onClick={submitForm}
                    color="primary"
                    disabled={loading}
                    variant="contained"
                  >
                    Finish
                  </Button>
                </Form>
              )}
            </Formik>
          )}
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="primary" />
          </Backdrop>
        </Grid>
      );
    } else return <Redirect to="/home" />;
  } else return <Redirect to="/login" />;
};
NotVerified.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  //setAlert: PropTypes.func.isRequired,
  user: PropTypes.object,
  sent: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  setHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
  user: state.users.user,
  sent: state.users.emailSent,
  loading: state.users.loading,
  step: state.users.step
});

export default connect(mapStateToProps, {
  clearErrors,
  // setAlert,
  setLoading,
  resendEmail,
  verifyEmail,
  setHandler
})(NotVerified);
