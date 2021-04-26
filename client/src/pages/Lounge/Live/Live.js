import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../material/Grid/GridContainer.js';
import GridItem from '../../../material/Grid/GridItem.js';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from '../../../views/Cards/UpcommingDebateCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setLoading,
  getLiveDebates,
  pushLike,
  pushLive
} from '../../../store/actions/debateActions';
const useStyles = makeStyles(styles);

const Live = ({
  debates,
  loading,
  setLoading,
  getLiveDebates,
  pushLike,
  pushLive,
  pusher
}) => {
  const classes = useStyles();

  useEffect(() => {
    setLoading();
    getLiveDebates();

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

Live.propTypes = {
  debates: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  getLiveDebates: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushLive: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.debates.loading,
  debates: state.debates.liveDebates,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, {
  setLoading,
  getLiveDebates,
  pushLike,
  pushLive
})(Live);
