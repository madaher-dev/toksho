import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from './DebateCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Challengers from './Challengers';
import {
  setLoading,
  getAllDebates
} from '../../../store/actions/debateActions';
const useStyles = makeStyles(styles);

const Challenges = ({ debates, loading, setLoading, getAllDebates }) => {
  const classes = useStyles();

  const [currentDebate, setCurrentDebate] = useState(null);

  useEffect(() => {
    setLoading();
    getAllDebates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridContainer spacing={0} className={classes.container}>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {debates.map(debate => (
            <DebateCard
              key={debate._id + 1}
              debate={debate}
              setCurrentDebate={setCurrentDebate}
            />
          ))}
        </GridItem>
      ) : loading ? (
        <CircularProgress className={classes.wallLoader} />
      ) : (
        <GridItem xs={12}> </GridItem>
      )}
      <Challengers debate={currentDebate} />
    </GridContainer>
  );
};

Challenges.propTypes = {
  debates: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  getAllDebates: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  debates: state.debates.debates,
  loading: state.debates.loading
});

export default connect(mapStateToProps, {
  setLoading,
  getAllDebates
})(Challenges);
