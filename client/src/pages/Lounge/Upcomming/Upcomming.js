import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../material/Grid/GridContainer.js';
import GridItem from '../../../material/Grid/GridItem.js';

import DebateCard from '../../../views/Cards/UpcommingDebateCard';

import {
  setLoading,
  getReadyDebates,
  pushLike,
  pushReady,
  pushLive
} from '../../../store/actions/debateActions';

import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const Upcomming = ({
  debates,
  loading,
  setLoading,
  getReadyDebates,
  pushLike,
  pushReady,
  pushLive
}) => {
  const classes = useStyles();

  useEffect(() => {
    setLoading();
    getReadyDebates();

    const pusher = new Pusher('3112d5ae0257895cff95', {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('debates');
    channel.bind('like', data => {
      let newData = {};
      newData.data = data;
      pushLike(newData);
    });
    channel.bind('ready', data => {
      let newData = {};
      newData.data = data;
      pushReady(newData);
    });
    channel.bind('joined', data => {
      let newData = {};
      newData.data = data;
      pushLive(newData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridContainer spacing={0} className={classes.container}>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {debates.map(debate => (
            <DebateCard key={debate._id + 1} debate={debate} />
          ))}
        </GridItem>
      ) : loading ? (
        <CircularProgress className={classes.wallLoader} />
      ) : (
        <GridItem xs={12}> </GridItem>
      )}
    </GridContainer>
  );
};

Upcomming.propTypes = {
  debates: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  getReadyDebates: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushReady: PropTypes.func.isRequired,
  pushLive: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  debates: state.debates.readyDebates,
  loading: state.debates.loading
});

export default connect(mapStateToProps, {
  setLoading,
  getReadyDebates,
  pushLike,
  pushReady,
  pushLive
})(Upcomming);
