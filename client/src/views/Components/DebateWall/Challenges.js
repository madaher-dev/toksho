import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from './DebateCard';
import PropTypes from 'prop-types';
const useStyles = makeStyles(styles);

const Challenges = ({ debates, loading }) => {
  const classes = useStyles();

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

Challenges.propTypes = {
  debates: PropTypes.array.isRequired
};

export default Challenges;
