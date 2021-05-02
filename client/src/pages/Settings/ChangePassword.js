import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import Button from '../../material/CustomButtons/Button.js';
import { Save as MuiSave } from '@material-ui/icons';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  updatePassword,
  clearErrors,
  setSettingsLoading
} from '../../store/actions/userActions';
import { setAlert } from '../../store/actions/alertActions';

const SaveIcon = styled(MuiSave)(spacing);

const ChangePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required(
    'If you forgot your old password please use the forgot password feature in Login page!'
  ),
  password: Yup.string()
    .min(8, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Please confirm your new password!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const ChangePassword = ({
  updatePassword,
  setSettingsLoading,
  loading,
  clearErrors,
  error,
  setAlert,
  passwordUpdated
}) => {
  useEffect(() => {
    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  useEffect(() => {
    if (passwordUpdated) {
      setAlert('Password Successfully Updated!', 'success');
      clearErrors();
    }
  }, [passwordUpdated, setAlert, clearErrors, error]);

  const form = (
    <Formik
      initialValues={{
        passwordCurrent: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setSettingsLoading();
          updatePassword(values);
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
          <GridContainer style={{ paddingTop: 20, width: '100%' }}>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="passwordCurrent"
                  type="password"
                  label="Current Password"
                  placeholder="Use the forgot password button if you forgot your passoword"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </GridItem>
            <GridItem>
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
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </GridItem>

            <GridItem
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              <Button
                color="primary"
                round
                style={{
                  height: 50,
                  marginRight: 10,
                  marginLeft: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto'
                }}
                onClick={submitForm}
              >
                <SaveIcon /> Change Password
              </Button>
            </GridItem>
          </GridContainer>
        </Form>
      )}
    </Formik>
  );
  return (
    <div>
      {loading ? (
        <CircularProgress
          color="primary"
          style={{ marginTop: 200, marginLeft: 200 }}
        />
      ) : (
        form
      )}
    </div>
  );
};

ChangePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  setSettingsLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.users.settingsLoading,
  error: state.users.error,
  passwordUpdated: state.users.passwordUpdated
});

export default connect(mapStateToProps, {
  updatePassword,
  clearErrors,
  setAlert,
  setSettingsLoading
})(ChangePassword);
