import React, { useState, createRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Avatar, Button as MuiButton, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete
} from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import styled from 'styled-components';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  uploadAvatar,
  setLoading,
  updateBio
} from '../../store/actions/userActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 5px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0
  },
  input: {
    minHeight: 100,
    display: 'flex',
    //flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
    //textAlign: 'left'
  }
}));

const AvatarModal = ({
  open,
  handleClose,
  loading,
  uploadAvatar,
  setLoading,
  error,
  step,
  updateBio
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [image, _setImage] = useState(null);
  const [imageBuffer, _setImageBuffer] = useState(null);
  const [bio, setBio] = useState('');
  const inputFileRef = createRef(null);

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

  const handleChangeBio = event => {
    //event.preventDefault();
    setBio(event.target.value);
  };
  const handleNext = event => {
    event.preventDefault();
    setLoading();
    uploadAvatar(imageBuffer);
  };

  const handleFinish = () => {
    updateBio(bio);
    handleClose();
  };
  const stepOne = (
    <CenteredContent>
      <DialogTitle id="signup-title">
        <VoiceChatIcon fontSize="large" color="primary" />
        <div>Let us add an Avatar</div>
      </DialogTitle>

      <BigAvatar
        $withBorder
        alt="Avatar"
        src={image || '/static/images/avatars/default-profile.png'}
        imgProps={{
          style: {
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'cover'
          }
        }}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          mb={2}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? 'Clear' : 'Upload'}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom>
        Make your profile more relatable by adding an Avatar.
      </Typography>
      <DialogActions>
        <Button onClick={handleNext} color="primary" disabled={loading}>
          Next
        </Button>
      </DialogActions>
    </CenteredContent>
  );
  const stepTwo = (
    <DialogContent>
      <DialogTitle id="signup-title">
        <VoiceChatIcon fontSize="large" color="primary" />
        <div>Your Bio</div>
      </DialogTitle>

      <TextField
        id="outlined-textarea"
        label="Enter your Bio"
        placeholder="You can add as many lines as you wish"
        multiline
        variant="outlined"
        onChange={handleChangeBio}
        value={bio}
        className={classes.textField}
        InputProps={{
          className: classes.input
        }}

        //style={{ width: '80%', minHeight: 420 }}
      />
      <DialogActions>
        <Button onClick={handleFinish} color="primary" disabled={loading}>
          Finish
        </Button>
      </DialogActions>
    </DialogContent>
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
          {step === 1 ? (
            stepOne
          ) : step === 2 ? (
            stepTwo
          ) : (
            <Typography>Click away</Typography>
          )}
        </Dialog>
      </Grid>
    </Grid>
  );
};

AvatarModal.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  error: PropTypes.string,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  updateBio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.users.error,
  user: state.users.user,
  loading: state.users.loading,
  step: state.users.avatarStep
});

export default connect(mapStateToProps, {
  uploadAvatar,
  setLoading,
  updateBio
})(AvatarModal);
