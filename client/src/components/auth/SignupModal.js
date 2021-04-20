import React, { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import differenceInYears from 'date-fns/differenceInYears';
import axios from 'axios';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import { Typography } from '@material-ui/core';
import { default as TextFieldAlone } from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  registerUser,
  setLoading,
  resendEmail,
  verifyEmail,
  setHandler
} from '../../store/actions/userActions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    width: '100vh'
  },
  error: {
    color: 'red'
  },
  grow: {
    flexGrow: 1
  },
  progress: {
    marginTop: 10,
    marginBottom: 5
  }
}));

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name Too Short!')
    .max(50, 'Name Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Required')
    .test(
      'username-backend-validation', // Name
      'Email has already been taken.', // Msg
      async email => {
        // Res from backend will be flag at res.data.success, true for
        // username good, false otherwise
        const {
          data: { success }
        } = await axios.post('/api/v1/users/validateEmail', {
          email: email
        });

        return success;
      }
    ),
  dob: Yup.date()
    .nullable()
    .test('dob', 'You should be at least 13 years old to use TokSho', function(
      value
    ) {
      return differenceInYears(new Date(), new Date(value)) >= 13;
    }),
  password: Yup.string()
    .min(8, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
});

const HandlerSchema = Yup.object().shape({
  handler: Yup.string()
    .min(3, 'Handler has to be longer than 3 characters!')
    .required('Required')
    //.trim('The handler cannot include leading and trailing spaces')
    .strict(true)
    .matches(
      /^@?(\w){1,15}$/,
      'The handler can only include letters and digits'
    )
    .matches(
      /^(?!(?:static|notfound|welcome|login|signup|notverified|reset|forgot|admin|home|profile|settings|logout|debate|mmydebate|debates|mydebates)$).*$/i,
      'This handler is not allowed'
    )
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
const SignupModal = ({
  open,
  handleClose,
  registerUser,
  setLoading,
  step,
  resendEmail,
  sent,
  verifyEmail,
  setHandler,
  loading,
  error
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSetCode = e => {
    e.preventDefault();
    setCode(e.target.value);
  };
  const handleVerify = () => {
    verifyEmail(code);
  };

  const stepOne = (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        dob: new Date()
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setEmail(values.email);
          setLoading();
          registerUser(values);
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
          <DialogTitle id="signup-title">
            <VoiceChatIcon fontSize="large" color="primary" />
            <div>Create your account</div>
          </DialogTitle>

          <DialogContent>
            <Box margin={1}>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </Box>
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
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
              />
            </Box>

            <Typography variant="h6" color="primary">
              Date of birth
            </Typography>
            <DialogContentText>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, an alien, or something else.
            </DialogContentText>
            <DatePicker
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              views={['year', 'month', 'date']}
              value={values.dob}
              onChange={v => setFieldValue('dob', v)}
              name="dob"
            />
            {errors.dob ? (
              <div className={classes.error}>{errors.dob}</div>
            ) : null}

            {loading && <LinearProgress className={classes.progress} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <Button onClick={submitForm} color="primary" disabled={loading}>
              Next
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
  const stepTwo = (
    <Fragment>
      <DialogTitle id="signup-title">
        <VoiceChatIcon fontSize="large" color="primary" />
        <div>Verify your email</div>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          We set you a code on your email {email}. Please enter it below to
          verify it is you.
        </DialogContentText>

        <TextFieldAlone
          autoFocus
          margin="dense"
          id="code"
          label="Verification Code"
          type="number"
          variant="outlined"
          width="150"
          onChange={handleSetCode}
        />
        <div className={classes.grow} />
        <Button
          color="primary"
          disabled={sent || loading}
          onClick={() => {
            setLoading();
            resendEmail(email);
          }}
        >
          Resend Email
        </Button>
        {error && <Typography className={classes.error}>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleVerify} color="primary" disabled={loading}>
          Verify
        </Button>
      </DialogActions>
    </Fragment>
  );
  const stepThree = (
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
          <DialogTitle id="signup-title">
            <VoiceChatIcon fontSize="large" color="primary" />
          </DialogTitle>
          <DialogTitle id="signup-title">Choose your handler</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will be your unique handler on TokSho
            </DialogContentText>

            <Box margin={1}>
              <Field
                component={TextField}
                name="handler"
                type="text"
                label="TokSho Handler"
                variant="outlined"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitForm} color="primary" disabled={loading}>
              Finish
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="signup-title"
        >
          {step === 1
            ? stepOne
            : step === 2
            ? stepTwo
            : step === 3
            ? stepThree
            : null}
        </Dialog>
      </Grid>
    </Grid>
  );
};

SignupModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  user: PropTypes.object,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  resendEmail: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  setHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.users.error,
  user: state.users.user,
  loading: state.users.loading,
  step: state.users.step,
  sent: state.users.emailSent
});

export default connect(mapStateToProps, {
  registerUser,
  setLoading,
  resendEmail,
  verifyEmail,
  setHandler
})(SignupModal);
