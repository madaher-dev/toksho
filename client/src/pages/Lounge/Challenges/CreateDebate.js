import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

import withStyles from '@material-ui/core/styles/withStyles';
// core components
import modalStyle from '../../../assets/jss/material-kit-react/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
import CustomLinearProgress from '../../../material/CustomLinearProgress/CustomLinearProgress.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createDebate,
  closeModal,
  setLoading
} from '../../../store/actions/debateActions';
import CreateDebateForm from '../../../components/Debates/CreateDebateForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

const CreatDebate = ({
  open,
  setOpen,
  createDebate,
  setLoading,
  closeModal,
  loading
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = values => {
    setLoading();
    createDebate(values);
  };
  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="modal-slide-title"
      aria-describedby="modal-slide-description"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      {loading && <CustomLinearProgress variant="query" color="primary" />}
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <CreateDebateForm handleSubmit={handleSubmit} closeModal={closeModal} />
      </div>
    </Dialog>
  );
};

CreatDebate.propTypes = {
  createDebate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  open: state.debates.openModal,
  loading: state.debates.loading
});

export default connect(mapStateToProps, {
  createDebate,
  setLoading,
  closeModal
})(withStyles(modalStyle)(CreatDebate));
