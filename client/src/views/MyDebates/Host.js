import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from '../Cards/NewDebateCard';
import { default as ReadyCard } from '../Cards/UpcommingDebateCard';
import PropTypes from 'prop-types';
import Challengers from '../Debate/Challengers';

const useStyles = makeStyles(styles);

const Host = ({ debates, loading, user }) => {
  const classes = useStyles();

  const hostDebates = debates.filter(debate => debate.user._id === user);

  return (
    <GridContainer spacing={0} className={classes.container}>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {hostDebates.map(debate => (
            <div key={debate._id + 1}>
              {debate.status === 'ready' ||
              debate.status === 'joined' ||
              debate.status === 'ended' ||
              debate.status === 'videoReady' ? (
                <ReadyCard key={debate._id + 1} debate={debate} />
              ) : (
                <DebateCard key={debate._id + 1} debate={debate} />
              )}
            </div>
          ))}
        </GridItem>
      ) : loading ? (
        <CircularProgress className={classes.wallLoader} />
      ) : (
        <GridItem xs={12}> </GridItem>
      )}
      <Challengers sourcePage={'host'} />
    </GridContainer>
  );
};

Host.propTypes = {
  debates: PropTypes.array.isRequired
};

export default Host;
