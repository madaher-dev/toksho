import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../material/Grid/GridContainer.js';
import GridItem from '../../../material/Grid/GridItem.js';

import DebateCard from '../../../views/Cards/UpcommingDebateCard';

import {
  setLoading,
  getReadyDebates
} from '../../../store/actions/debateActions';

import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const Upcomming = ({ debates, loading, setLoading, getReadyDebates }) => {
  const classes = useStyles();

  useEffect(() => {
    setLoading();
    getReadyDebates();

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
  getReadyDebates: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  debates: state.debates.readyDebates,
  loading: state.debates.loading
});

export default connect(mapStateToProps, {
  setLoading,
  getReadyDebates
})(Upcomming);
