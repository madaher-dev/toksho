import React from 'react';
import GridContainer from '../../material/Grid/GridContainer';
import GridItem from '../../material/Grid/GridItem';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Card from '../../material/Card/Card.js';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/components/commentStyle';
const useStyles = makeStyles(styles);

const JoinNotification = ({ source, debate }) => {
  const history = useHistory();
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  let profileImage;
  if (source) {
    profileImage =
      source.photo === 'null'
        ? '/static/images/avatars/default-profile.png'
        : source.photo;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }

  return (
    <Card>
      <CardActionArea
        component="span"
        onClick={() => history.push(`/debates/${debate}`)}
        disableRipple={true}
      >
        <GridContainer
          direction="row"
          //className={classes.cardContainer}
          style={{ width: '100%', paddingLeft: 10 }}
        >
          <GridItem xs={2} className={classes.image}>
            <Link
              onClick={event => {
                event.stopPropagation();
                //event.preventDefault();
              }}
              to={`/${source?.handler}`}
            >
              <img src={profileImage} alt="..." className={imageClasses} />{' '}
            </Link>
          </GridItem>
          <GridItem xs={10} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              Your
              <Link
                onClick={event => {
                  event.stopPropagation();
                  //event.preventDefault();
                }}
                to={`/debates/${debate}`}
                className={classes.link}
              >
                <strong>Debate </strong>
              </Link>
              is scheduled to start soon. You can now Join the room and wait for
              your guests.
            </div>
          </GridItem>
        </GridContainer>
      </CardActionArea>
    </Card>
  );
};

export default JoinNotification;
