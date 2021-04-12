import React, { useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../../../components/CustomButtons/Button.js';
import modalStyle from '../../../assets/jss/material-kit-react/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ChallengerCard from './ChallengerCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setChallengersLoading,
  getChallengers,
  handleCloseModal,
  setReadyLoading
} from '../../../store/actions/profileActions';
import { setReady } from '../../../store/actions/debateActions';
import CircularProgress from '@material-ui/core/CircularProgress';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

const Challengers = ({
  open,
  debate,
  setChallengersLoading,
  getChallengers,
  challengers,
  loading,
  debates,
  setReady,
  handleCloseModal,
  readyLoading,
  setReadyLoading,
  sourcePage,
  myDebates
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (debate) {
      setChallengersLoading();
      getChallengers(debate._id);
    }
  }, [debate, setChallengersLoading, getChallengers]);

  // This is used to refresh ready button when no picks
  let currentDebate;
  if (sourcePage === 'host' && myDebates.length > 0) {
    currentDebate = myDebates.find(newDebate => newDebate._id === debate?._id);
  } else if (debates.length > 0)
    currentDebate = debates.find(newDebate => newDebate._id === debate?._id);

  const handleReady = () => {
    setReadyLoading();
    setReady(debate._id);
  };
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
          <div>Choose your Guests</div>
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
            <ChallengerCard
              key={challenger._id + 1}
              challenger={challenger}
              debate={debate}
              sourcePage={sourcePage}
            />
          ))
        ) : (
          <CircularProgress className={classes.loading} />
        )}
      </DialogContent>

      <DialogActions className={classes.modalFooter}>
        <Button
          color="github"
          round
          className={classes.submit}
          onClick={handleCloseModal}
          disabled={readyLoading}
        >
          Continue Accepting
        </Button>
        {currentDebate?.guests?.length > 0 ? (
          <Button
            color="primary"
            round
            className={classes.submit}
            onClick={handleReady}
            disabled={readyLoading}
          >
            Ready
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

Challengers.propTypes = {
  setChallengersLoading: PropTypes.func.isRequired,
  setReadyLoading: PropTypes.func.isRequired,
  getChallengers: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setReady: PropTypes.func.isRequired,
  challengers: PropTypes.array,
  sourcePage: PropTypes.string
};

const mapStateToProps = state => ({
  challengers: state.profiles.challengers,
  loading: state.profiles.loading,
  debates: state.debates.debates,
  myDebates: state.debates.myDebates,
  open: state.profiles.challengersModal,
  readyLoading: state.profiles.readyLoading
});

export default connect(mapStateToProps, {
  setChallengersLoading,
  getChallengers,
  setReady,
  handleCloseModal,
  setReadyLoading
})(Challengers);
