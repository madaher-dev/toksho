import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import ReadyDebateView from '../../views/Debate/ReadyDebateView';
import NewDebateView from '../../views/Debate/NewDebateView';
import EndedDebateView from '../../views/Debate/EndedDebateView';
import Challengers from '../../views/Debate/Challengers';
import SideBar from '../../views/SideBar/SideBar';

import {
  getMyDebates,
  setLoading,
  getDebate
} from '../../store/actions/debateActions';

const Debate = ({ match, fullDebate, setLoading, getDebate }) => {
  const debate = match.params.debate;
  useEffect(() => {
    setLoading();
    //getMyDebates();
    getDebate(debate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item sm={12} md={9} style={{ paddingLeft: 10, paddingRight: 10 }}>
        {fullDebate?.status === 'ready' || fullDebate?.status === 'joined' ? (
          <ReadyDebateView debate={fullDebate} />
        ) : fullDebate?.status === 'ended' ||
          fullDebate?.status === 'videoReady' ? (
          <EndedDebateView debate={fullDebate} />
        ) : fullDebate ? (
          <NewDebateView debate={fullDebate} />
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
      <Challengers sourcePage="debate" />
    </Grid>
  );
};

Debate.propTypes = {
  fullDebate: PropTypes.object,
  setLoading: PropTypes.func.isRequired,
  getDebate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fullDebate: state.debates.debate,
  pusher: state.users.pusher
});
export default connect(mapStateToProps, {
  getMyDebates,
  setLoading,
  getDebate
})(Debate);
