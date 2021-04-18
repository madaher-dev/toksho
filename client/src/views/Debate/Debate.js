import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import Grid from '@material-ui/core/Grid';
import SideBar from '../Components/SideBar/SideBar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReadyDebateCard from './ReadyDebateCard';
import NewDebateCard from './NewDebateCard';
import Challengers from '../Components/DebateWall/Challengers';
import {
  getMyDebates,
  setLoading,
  getDebate,
  pushLike,
  pushChallenge,
  pushReady,
  pushLive
} from '../../store/actions/debateActions';
import { pushPick } from '../../store/actions/profileActions';

const Debate = ({
  match,
  fullDebate,
  pushReady,
  setLoading,
  getDebate,
  pushLike,
  pushChallenge,
  pushLive
}) => {
  const debate = match.params.debate;
  useEffect(() => {
    setLoading();
    //getMyDebates();
    getDebate(debate);

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
    <Grid container>
      <Grid item sm={12} md={9} style={{ paddingLeft: 10, paddingRight: 10 }}>
        {fullDebate?.status === 'ready' || fullDebate?.status === 'joined' ? (
          <ReadyDebateCard debate={fullDebate} />
        ) : fullDebate ? (
          <NewDebateCard debate={fullDebate} />
        ) : null}
      </Grid>

      <Box
        component={Grid}
        item
        sm={false}
        md={3}
        display={{ xs: 'none', md: 'block' }}
      >
        <SideBar />
      </Box>
      <Challengers sourcePage={'host'} />
    </Grid>
  );
};

Debate.propTypes = {
  fullDebate: PropTypes.object,
  setLoading: PropTypes.func.isRequired,
  getDebate: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushChallenge: PropTypes.func.isRequired,
  pushPick: PropTypes.func.isRequired,
  pushReady: PropTypes.func.isRequired,
  pushLive: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fullDebate: state.debates.debate
});
export default connect(mapStateToProps, {
  getMyDebates,
  setLoading,
  getDebate,
  pushLike,
  pushChallenge,
  pushPick,
  pushReady,
  pushLive
})(Debate);
