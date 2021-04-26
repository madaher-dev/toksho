import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';

import Ended from '../../views/EndedDebates/Ended';
import CreatDebate from '../../pages/Lounge/Challenges/CreateDebate';

import {
  openModal,
  getEndedDebates,
  setLoading,
  pushLike,
  pushEnded
} from '../../store/actions/debateActions';

import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const WatchDebatesWall = ({
  width,
  openModal,
  setLoading,
  endedDebates,
  loading,
  pushLike,
  pushEnded,
  getEndedDebates,
  pusher
}) => {
  const classes = useStyles();
  // This is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const buttonProps = {
    variant: isSmallScreen ? 'round' : 'extended',
    size: isSmallScreen ? 'small' : 'large'
  };
  useEffect(() => {
    setLoading();
    getEndedDebates();
    // const pusher = new Pusher('3112d5ae0257895cff95', {
    //   cluster: 'eu',
    //   encrypted: true
    // });

    const channel = pusher.subscribe('debates');
    channel.bind('like', data => {
      let newData = {};
      newData.data = data;
      pushLike(newData);
    });

    channel.bind('ended', data => {
      let newData = {};
      newData.data = data;
      pushEnded(newData);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Fab
        {...buttonProps}
        color="primary"
        aria-label="add"
        className={classes.cta}
        onClick={() => openModal()}
      >
        <AddIcon />
        {!isSmallScreen ? 'Host a Debate' : null}
      </Fab>
      <Ended debates={endedDebates} loading={loading} />
      <CreatDebate />
    </div>
  );
};

WatchDebatesWall.propTypes = {
  openModal: PropTypes.func.isRequired,
  getEndedDebates: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushEnded: PropTypes.func.isRequired,
  endedDebates: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  endedDebates: state.debates.endedDebates,
  loading: state.debates.loading,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, {
  openModal,
  getEndedDebates,
  setLoading,
  pushLike,
  pushEnded
})(withWidth()(WatchDebatesWall));
