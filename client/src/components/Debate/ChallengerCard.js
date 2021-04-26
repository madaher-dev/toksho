import React from 'react';
import PropTypes from 'prop-types';

import GridContainer from '../../material/Grid/GridContainer';
import GridItem from '../../material/Grid/GridItem';

import classNames from 'classnames';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/challengersStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const ChallengerCard = ({ challenger }) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  let profileImage;
  if (challenger) {
    profileImage =
      challenger.photo === 'null'
        ? '/static/images/avatars/default-profile.png'
        : challenger.photo;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }

  return (
    <GridContainer direction="row" className={classes.container}>
      <GridItem xs={2} className={classes.image}>
        <img src={profileImage} alt="..." className={imageClasses} />
      </GridItem>
      <GridItem xs={10}>
        <GridContainer className={classes.innerContainer}>
          <GridItem xs={2} className={classes.info}>
            <GridItem className={classes.name}>
              <a href={`/${challenger.handler}`} className={classes.link}>
                <strong>{challenger.name}</strong>
              </a>
            </GridItem>
            <GridItem className={classes.handler}>
              @{challenger.handler}
            </GridItem>
          </GridItem>
          <GridItem xs={4} className={classes.buttonContainer}></GridItem>
        </GridContainer>
        <GridItem className={classes.bio}>
          <p>{challenger.bio}</p>
        </GridItem>
      </GridItem>
    </GridContainer>
  );
};

ChallengerCard.propTypes = {
  challenger: PropTypes.object.isRequired
};

export default ChallengerCard;
