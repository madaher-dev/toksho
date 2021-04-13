import React from 'react';
import classNames from 'classnames';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import Button from '../../../components/CustomButtons/Button.js';
import { Link } from 'react-router-dom';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(styles);
const Guests = ({
  guests,
  schedule,
  myDebate,
  handleJoin,
  live,
  abandoned
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
  const showJoin = Date.now() > canJoin && myDebate && !live && !abandoned;
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
          onClick={() => handleJoin()}
        >
          <AlarmOnIcon /> Join Debate
        </Button>
      )}
      <strong> {abandoned && 'ABANDONED'}</strong>
    </GridContainer>
  );
};

export default Guests;
