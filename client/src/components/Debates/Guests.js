import React from 'react';
import { useHistory } from 'react-router-dom';

import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import Button from '../../material/CustomButtons/Button.js';
import { Link } from 'react-router-dom';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
const useStyles = makeStyles(styles);
const Guests = ({
  guests,
  schedule,
  myDebate,
  handleJoin,
  abandoned,
  joined
}) => {
  const classes = useStyles();
  const history = useHistory();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const dateSchedul = new Date(schedule);
  const canJoin = new Date(dateSchedul?.getTime() - 15 * 60000);
  const showJoin = Date.now() > canJoin && myDebate && !joined && !abandoned;
  return (
    <GridContainer>
      <GridItem style={{ textAlign: 'center', marginTop: 5 }}>
        <strong>Guests</strong>
      </GridItem>

      {guests.map(guest => (
        <GridContainer style={{ marginBottom: 10 }} key={guest._id + 1}>
          <GridItem
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src={
                guest.photo && guest.photo !== 'null'
                  ? `/static/images/avatars/${guest.photo}`
                  : '/static/images/avatars/default-profile.png'
              }
              alt="..."
              className={imageClasses}
              style={{ width: 100 }}
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                history.push(`/${guest.handler}`);
              }}
            />
          </GridItem>
          <GridItem style={{ textAlign: 'center', marginTop: 5 }}>
            <Link
              onClick={event => {
                event.stopPropagation();
                //event.preventDefault();
              }}
              to={`/${guest.handler}`}
              className={classes.link}
            >
              {' '}
              <strong>{guest.name} </strong>
            </Link>
          </GridItem>
        </GridContainer>
      ))}
      {showJoin && (
        <Button
          color="primary"
          round
          style={{
            height: 50,
            marginRight: 10,
            marginLeft: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto'
          }}
          onClick={event => {
            event.stopPropagation();
            handleJoin();
          }}
        >
          <AlarmOnIcon /> Join Debate
        </Button>
      )}
    </GridContainer>
  );
};

export default Guests;