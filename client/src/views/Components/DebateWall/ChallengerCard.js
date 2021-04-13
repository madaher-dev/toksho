import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/challengersStyle';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PickButton from './PickButton';
import {
  setPickLoading,
  pick,
  unpick
} from '../../../store/actions/profileActions';
const useStyles = makeStyles(styles);

const ChallengerCard = ({
  challenger,
  debate,
  setPickLoading,
  pick,
  unpick,
  sourcePage
}) => {
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
        : `/static/images/avatars/${challenger.photo}`;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }

  const handlePick = () => {
    setPickLoading(challenger._id);
    pick(debate._id, challenger._id);
  };
  const handleUnpick = () => {
    setPickLoading(challenger._id);
    unpick(debate._id, challenger._id);
  };

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
          <GridItem xs={4} className={classes.buttonContainer}>
            <PickButton
              pick={handlePick}
              unpick={handleUnpick}
              challenger={challenger}
              debate={debate}
              sourcePage={sourcePage}
            />
          </GridItem>
        </GridContainer>
        <GridItem className={classes.bio}>
          <p>{challenger.bio}</p>
        </GridItem>
      </GridItem>
    </GridContainer>
  );
};

ChallengerCard.propTypes = {
  debate: PropTypes.object,
  setPickLoading: PropTypes.func.isRequired,
  pick: PropTypes.func.isRequired,
  challenger: PropTypes.object.isRequired,
  sourcePage: PropTypes.string
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps, {
  setPickLoading,
  pick,
  unpick
})(ChallengerCard);
