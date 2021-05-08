import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import DebateCard from '../../views/Cards/NewDebateCard';
import { default as ReadyCard } from '../../views/Cards/UpcommingDebateCard';
import PropTypes from 'prop-types';
import Challengers from '../../views/Debate/Challengers';

const useStyles = makeStyles(styles);

const SearchWall = ({ debates, loading, handleOpenSnack }) => {
  const classes = useStyles();

  return (
    <GridContainer spacing={0} className={classes.container}>
      <GridItem>
        <h2>Search Results</h2>
      </GridItem>
      {debates !== [] && !loading ? (
        <GridItem xs={12}>
          {debates.map(debate => (
            <div key={debate._id + 1}>
              {debate.status === 'ready' ||
              debate.status === 'joined' ||
              debate.status === 'ended' ||
              debate.status === 'videoReady' ? (
                <ReadyCard
                  key={debate._id + 1}
                  debate={debate}
                  handleOpenSnack={handleOpenSnack}
                />
              ) : (
                <DebateCard
                  key={debate._id + 1}
                  debate={debate}
                  handleOpenSnack={handleOpenSnack}
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
      <Challengers sourcePage={'host'} />
    </GridContainer>
  );
};

SearchWall.propTypes = {
  debates: PropTypes.array.isRequired
};

export default SearchWall;
