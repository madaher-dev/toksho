import React, { useState } from 'react';
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

const Guest = ({ debates, loading, user }) => {
  const classes = useStyles();

  const [currentDebate, setCurrentDebate] = useState(null);

  const hostDebates = debates?.filter(({ guests }) =>
    guests.some(({ _id }) => _id?.includes(user))
  );

  return (
    <GridContainer spacing={0} className={classes.container}>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {hostDebates?.map(debate => (
            <div key={debate._id + 1}>
              {debate.status === 'ready' ? (
                <ReadyCard
                  key={debate._id + 1}
                  debate={debate}
                  setCurrentDebate={setCurrentDebate}
                />
              ) : (
                <DebateCard
                  key={debate._id + 1}
                  debate={debate}
                  setCurrentDebate={setCurrentDebate}
                />
              )}
            </div>
          ))}
        </GridItem>
      ) : loading ? (
        <CircularProgress className={classes.wallLoader} />
      ) : (
        <GridItem xs={12}> </GridItem>
      )}
      {/* sourcepage used to find current debate in appropriate state (host for My Debates page) */}
      <Challengers debate={currentDebate} sourcePage={'host'} />
    </GridContainer>
  );
};

Guest.propTypes = {
  debates: PropTypes.array.isRequired
};

export default Guest;