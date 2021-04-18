import React, { useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '../../components/CustomButtons/Button.js';
import modalStyle from '../../assets/jss/material-kit-react/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ChallengerCard from './ChallengerCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setChallengersLoading,
  getLikers
} from '../../store/actions/profileActions';

import CircularProgress from '@material-ui/core/CircularProgress';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

const ChallengersList = ({
  open,
  debate,
  setChallengersLoading,
  getLikers,
  likers,
  loading,
  handleCloseModal
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (debate) {
      setChallengersLoading();
      getLikers(debate._id);
    }
  }, [debate, setChallengersLoading, getLikers]);

  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      open={open}
      onClose={handleCloseModal}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="modal-slide-title"
      aria-describedby="modal-slide-description"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="signup-title" className={classes.modalHeader}>
        <div className={classes.header}>
          <div>Likes</div>
          <div>
            <Button justIcon color="transparent" onClick={handleCloseModal}>
              <i className={classes.closeButton + ' far fa-window-close'} />
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        {!loading ? (
          likers.map(challenger => (
            <ChallengerCard key={challenger._id + 1} challenger={challenger} />
          ))
        ) : (
          <CircularProgress className={classes.loading} />
        )}
      </DialogContent>
    </Dialog>
  );
};

ChallengersList.propTypes = {
  setChallengersLoading: PropTypes.func.isRequired,

  getLikers: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

  likers: PropTypes.array
};

const mapStateToProps = state => ({
  likers: state.profiles.likers,
  loading: state.profiles.loading
});

export default connect(mapStateToProps, {
  setChallengersLoading,
  getLikers
})(ChallengersList);
