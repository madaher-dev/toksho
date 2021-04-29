import React, { useState, createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import differenceInYears from 'date-fns/differenceInYears';

import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import { DatePicker } from '@material-ui/pickers';

import { Avatar, Button as MuiButton, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
  Save as MuiSave
} from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import Button from '../../material/CustomButtons/Button.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import {
  updateInfo,
  setSettingsLoading,
  clearErrors
} from '../../store/actions/userActions';
import { setAlert } from '../../store/actions/alertActions';
import styled from 'styled-components';

const MUIButton = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);
const SaveIcon = styled(MuiSave)(spacing);

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 5px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name Too Short!')
    .max(50, 'Name Too Long!')
    .required('Required'),

  dob: Yup.date()
    .nullable()
    .test('dob', 'You should be at least 13 years old to use TokSho', function(
      value
    ) {
      return differenceInYears(new Date(), new Date(value)) >= 13;
    }),
  bio: Yup.string()
});
const UserInfo = ({
  user,
  updateInfo,
  setSettingsLoading,
  loading,
  error,
  setAlert,
  clearErrors
}) => {
  const [image, _setImage] = useState(null);
  const [imageBuffer, _setImageBuffer] = useState(null);
  const inputFileRef = createRef(null);

  useEffect(() => {
    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
    _setImageBuffer(null);
  };

  const setImage = newImage => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = event => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      _setImageBuffer(newImage);
    }
  };
  const handleClick = event => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };
  return (
    <Formik
      initialValues={{
        name: user.name || '',
        bio: user.bio || '',
        dob: user ? new Date(user.dob) : new Date()
      }}
      validationSchema={UpdateInfoSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setSettingsLoading();
          updateInfo(values, imageBuffer);
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
              <BigAvatar
                $withBorder
                alt="Avatar"
                src={
                  image
                    ? image
                    : user.photo !== 'null'
                    ? user.photo
                    : '/static/images/avatars/default-profile.png'
                }
                imgProps={{
                  style: {
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover'
                  }
                }}
              />
              <div
                style={{
                  paddingTop: 20,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <input
                  ref={inputFileRef}
                  accept="image/*"
                  hidden
                  id="avatar-image-upload"
                  type="file"
                  onChange={handleOnChange}
                />

                <label htmlFor="avatar-image-upload">
                  <MUIButton
                    variant="contained"
                    color="primary"
                    component="span"
                    mb={2}
                    onClick={handleClick}
                  >
                    {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                    {image ? 'Clear' : 'Upload'}
                  </MUIButton>
                </label>
              </div>
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  fullWidth
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="bio"
                  type="text"
                  label="Enter your Bio"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={values.bio}
                />
              </Box>
            </GridItem>
            <GridItem style={{ paddingLeft: 25 }}>
              <h5>Date of birth</h5>
              <p>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, an alien, or something else.
              </p>
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
                <div style={{ color: 'red' }}>{errors.dob}</div>
              ) : null}
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
                <SaveIcon /> Save Changes
              </Button>
            </GridItem>
            <Backdrop
              style={{ zIndex: 1000, color: '#fff' }}
              invisible
              open={loading}
            >
              <CircularProgress color="primary" />
            </Backdrop>
          </GridContainer>
        </Form>
      )}
    </Formik>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  updateInfo: PropTypes.func.isRequired,
  setSettingsLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  error: PropTypes.string,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.users.settingsLoading,
  error: state.users.error
});

export default connect(mapStateToProps, {
  updateInfo,
  setSettingsLoading,
  setAlert,
  clearErrors
})(UserInfo);
