import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import { default as ReadyCard } from '../Cards/UpcommingDebateCard';
import PropTypes from 'prop-types';

const useStyles = makeStyles(styles);

const Ended = ({ debates, loading, handleOpenSnack }) => {
  const classes = useStyles();

  return (
    <GridContainer spacing={0} className={classes.container}>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {debates?.map(debate => (
            <div key={debate._id + 1}>
              <ReadyCard
                key={debate._id + 1}
                debate={debate}
                handleOpenSnack={handleOpenSnack}
              />
            </div>
          ))}
        </GridItem>
      ) : loading ? (
        <CircularProgress className={classes.wallLoader} />
      ) : (
        <GridItem xs={12}> </GridItem>
      )}
      {/* sourcepage used to find current debate in appropriate state (host for My Debates page) */}
      {/* <Challengers sourcePage={'ended'} /> */}
    </GridContainer>
  );
};

Ended.propTypes = {
  debates: PropTypes.array.isRequired
};

export default Ended;
