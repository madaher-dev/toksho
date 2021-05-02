import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '../../material/CustomButtons/Button.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ChallengerCard from './ChallengerCard';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  setChallengersLoading,
  getChallengers
} from '../../store/actions/profileActions';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from '../../assets/jss/material-kit-react/modalStyle.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

const ChallengersList = ({
  open,
  debate,
  setChallengersLoading,
  getChallengers,
  challengers,
  loading,
  handleCloseModal
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (debate) {
      //setChallengersLoading();
      getChallengers(debate._id);
    }
  }, [debate, setChallengersLoading, getChallengers]);

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
          <div>Challengers</div>
          <div>
            <Button justIcon color="transparent" onClick={handleCloseModal}>
              <i className={classes.closeButton + ' far fa-window-close'} />
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        {!loading ? (
          challengers.map(challenger => (
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

  getChallengers: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

  challengers: PropTypes.array
};

const mapStateToProps = state => ({
  challengers: state.profiles.challengers,
  loading: state.profiles.loading
});

export default connect(mapStateToProps, {
  setChallengersLoading,
  getChallengers
})(ChallengersList);
