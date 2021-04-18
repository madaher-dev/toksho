import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from '../Components/DebateWall/DebateCard';
import { default as ReadyCard } from '../Components/UpcommingDebates/DebateCard';
import PropTypes from 'prop-types';
import Challengers from '../Components/DebateWall/Challengers';

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
              {debate.status === 'ready' || debate.status === 'joined' ? (
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
