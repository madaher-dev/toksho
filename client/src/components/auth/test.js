import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Formik, Form, Field } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    // alignItems: 'center',
    //justifyContent: 'center',
    width: '100vh'

    // height: '100vh'
  }
}));

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Name Too Short!')
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
        } = await axios.post('/api/users/validateEmail', { email: email });

        return success;
      }
    )
});

const SignupModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          <DialogTitle id="signup-title">
            <VoiceChatIcon fontSize="large" color="primary" />
          </DialogTitle>
          <DialogTitle id="signup-title">Create your account</DialogTitle>
          <Formik
            initialValues={{
              name: '',
              email: '',
              dob: new Date()
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                //setLoading();
                //registerUser(values);
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
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
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
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </Box>

                  <Typography variant="h6" color="primary">
                    Date of birth
                  </Typography>
                  <DialogContentText>
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
                  </DialogContentText>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    views={['year', 'month', 'date']}
                    value={values.dob}
                    onChange={v => setFieldValue('dob', v)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default SignupModal;
