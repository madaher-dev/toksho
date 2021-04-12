import React from 'react';
import classNames from 'classnames';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(styles);
const Guests = ({ guests }) => {
  const classes = useStyles();
  const history = useHistory();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <GridContainer>
      <GridItem style={{ textAlign: 'center', marginTop: 5 }}>
        <strong>Guests</strong>
      </GridItem>
      {guests.map(guest => (
        <div style={{ marginBottom: 5 }} key={guest._id + 1}>
          <GridItem>
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
          <GridItem style={{ textAlign: 'center' }}>
            <Link
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
              }}
              to={`/${guest.handler}`}
              className={classes.link}
            >
              {' '}
              <strong>{guest.name} </strong>
            </Link>
          </GridItem>
        </div>
      ))}
    </GridContainer>
  );
};

export default Guests;
