import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../material/CustomButtons/Button.js';
import { Save as MuiSave } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

import {
  updateSocial,
  setSettingsLoading,
  clearErrors
} from '../../store/actions/userActions';
import { setAlert } from '../../store/actions/alertActions';
import styled from 'styled-components';
const SaveIcon = styled(MuiSave)(spacing);

const Social = ({
  updateSocial,
  setSettingsLoading,
  clearErrors,
  loading,
  user
}) => {
  const form = (
    <Formik
      initialValues={{
        facebook: user.facebook || '',
        twitter: user.twitter || '',
        linkedIn: user.linkedIn || '',
        instagram: user.instagram || ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setSettingsLoading();
          updateSocial(values);
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
                  name="facebook"
                  type="text"
                  label="Facebook"
                  value={values.facebook}
                  placeholder="Your Facebook Page URL. ex: https://www.facebook.com/toksho"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <FacebookIcon style={{ color: '	#4267B2' }} />
                    )
                  }}
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  value={values.twitter}
                  name="twitter"
                  type="text"
                  label="Twitter"
                  variant="outlined"
                  placeholder="Your Twitter Handler. ex: toksho"
                  fullWidth
                  InputProps={{
                    startAdornment: <TwitterIcon style={{ color: '	#00ACEE' }} />
                  }}
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  value={values.instagram}
                  name="instagram"
                  type="text"
                  label="Instagram"
                  variant="outlined"
                  placeholder="Your Instagram Handler. ex: toksho"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InstagramIcon style={{ color: '	#cd486b' }} />
                    )
                  }}
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box margin={1}>
                <Field
                  component={TextField}
                  value={values.linkedIn}
                  name="linkedIn"
                  type="text"
                  label="LinkedIn"
                  variant="outlined"
                  placeholder="Your LinkedIn URL. ex: https://www.linkedin.com/in/toksho"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <LinkedInIcon style={{ color: '	#0077b5' }} />
                    )
                  }}
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
                <SaveIcon /> Update Social Networks
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

Social.propTypes = {
  user: PropTypes.object.isRequired,
  updateSocial: PropTypes.func.isRequired,
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
  updateSocial,
  setSettingsLoading,
  setAlert,
  clearErrors
})(Social);
