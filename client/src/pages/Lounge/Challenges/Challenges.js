import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../material/Grid/GridContainer.js';
import GridItem from '../../../material/Grid/GridItem.js';

import DebateCard from '../../../views/Cards/NewDebateCard';
import Challengers from '../../../views/Debate/Challengers';

import {
  setLoading,
  getAllDebates,
  pushLike,
  pushNewDebate,
  pushChallenge,
  pushReady,
  pushLive
} from '../../../store/actions/debateActions';
import { pushPick } from '../../../store/actions/profileActions';

import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const Challenges = ({
  debates,
  loading,
  setLoading,
  getAllDebates,
  pushLike,
  pushNewDebate,
  pushChallenge,
  pushPick,
  pushReady,
  pusher,
  pushLive
}) => {
  const classes = useStyles();

  useEffect(() => {
    setLoading();
    getAllDebates();

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

    channel.bind('new-debate', data => {
      let newData = {};
      newData.data = data;
      pushNewDebate(newData);
    });

    channel.bind('challenge', data => {
      let newData = {};
      newData.data = data;
      pushChallenge(newData);
    });

    channel.bind('pick', data => {
      let newData = {};
      newData.data = data;
      pushPick(newData);
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
      <Challengers />
    </GridContainer>
  );
};

Challenges.propTypes = {
  debates: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  getAllDebates: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushNewDebate: PropTypes.func.isRequired,
  pushChallenge: PropTypes.func.isRequired,
  pushPick: PropTypes.func.isRequired,
  pushReady: PropTypes.func.isRequired,
  pushLive: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  debates: state.debates.debates,
  loading: state.debates.loading,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, {
  setLoading,
  getAllDebates,
  pushLike,
  pushNewDebate,
  pushChallenge,
  pushPick,
  pushReady,
  pushLive
})(Challenges);
