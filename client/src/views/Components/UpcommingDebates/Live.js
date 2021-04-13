import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from './DebateCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setLoading,
  getLiveDebates
} from '../../../store/actions/debateActions';
const useStyles = makeStyles(styles);

const Live = ({ debates, loading, setLoading, getLiveDebates }) => {
  const classes = useStyles();

  useEffect(() => {
    setLoading();
    getLiveDebates();
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
  getLiveDebates: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  debates: state.debates.liveDebates,
  loading: state.debates.loading
});

export default connect(mapStateToProps, {
  setLoading,
  getLiveDebates
})(Live);
