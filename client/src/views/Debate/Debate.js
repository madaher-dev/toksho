import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SideBar from '../Components/SideBar/SideBar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DebateCard from '../Components/DebateWall/DebateCard';
import { default as ReadyCard } from '../Components/UpcommingDebates/DebateCard';
import ReadyDebateCard from './ReadyDebateCard';
import NewDebateCard from './NewDebateCard';
import Challengers from '../Components/DebateWall/Challengers';
import {
  getMyDebates,
  setLoading,
  getDebate
} from '../../store/actions/debateActions';

const Debate = ({ match, fullDebate, getMyDebates, setLoading, getDebate }) => {
  const debate = match.params.debate;
  useEffect(() => {
    setLoading();
    //getMyDebates();
    getDebate(debate);
  }, []);
  const [currentDebate, setCurrentDebate] = useState(null);

  return (
    <Grid container>
      <Grid item sm={12} md={9} style={{ paddingLeft: 10 }}>
        {fullDebate?.status === 'ready' && fullDebate ? (
          <ReadyDebateCard
            debate={fullDebate}
            setCurrentDebate={setCurrentDebate}
          />
        ) : fullDebate ? (
          <NewDebateCard
            debate={fullDebate}
            setCurrentDebate={setCurrentDebate}
          />
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
      <Challengers debate={currentDebate} sourcePage={'host'} />
    </Grid>
  );
};

Debate.propTypes = {
  fullDebate: PropTypes.object,
  getMyDebates: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getDebate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fullDebate: state.debates.debate
});
export default connect(mapStateToProps, {
  getMyDebates,
  setLoading,
  getDebate
})(Debate);
