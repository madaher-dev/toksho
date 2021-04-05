import React from 'react';
import Button from '../../../components/CustomButtons/Button.js';
import Card from '../../../components/Card/Card.js';
import team1 from '../../../assets/img/faces/avatar.jpg';
import Badge from '../../../components/Badge/Badge.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import classNames from 'classnames';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';

const useStyles = makeStyles(styles);

const DebateCard = ({ debate }) => {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  var now = Moment(); //todays date
  var sched = Moment(debate.schedule); // schedule date
  var duration = Moment.duration(now.diff(sched));
  var days = Math.floor(duration.asDays());
  var hours = Math.floor(duration.asHours());
  var mins = Math.floor(duration.asMinutes());
  var secs = Math.floor(duration.asSeconds());

  return (
    <Card>
      <GridItem>
        <GridContainer style={{ paddingTop: 10 }}>
          <GridItem xs={4} sm={2}>
            <img src={team1} alt="..." className={imageClasses} />
          </GridItem>
          <GridItem xs={8} sm={10}>
            <GridContainer>
              <GridItem>
                <GridContainer>
                  <GridItem xs={12}>
                    <strong>Jhon Long Smith </strong>@madaher12345678{' '}
                    {hours >= 24
                      ? days
                      : mins >= 60
                      ? hours
                      : secs >= 60
                      ? mins
                      : secs}
                    {hours >= 24
                      ? 'd'
                      : mins >= 60
                      ? 'h'
                      : secs >= 60
                      ? 'm'
                      : 's'}
                  </GridItem>
                  <GridItem>
                    <GridContainer
                      wrap="nowrap"
                      className={classes.debateTitle}
                    >
                      <GridItem zeroMinWidth>
                        <h4 style={{ overflowWrap: 'break-word' }}>
                          <strong>{debate.title}</strong>
                        </h4>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem>
                    <p className={classes.description}>{debate.synopsis}</p>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer>
                  <GridItem xs={12} md={6}>
                    <p>
                      <strong>Date: </strong>
                      {Moment(debate.schedule).format('DD MMM YYYY')}
                    </p>
                    <p>
                      <strong>Time: </strong>
                      {Moment(debate.schedule).format('h:mm A')}
                    </p>
                    <p>
                      <strong>Language: </strong>
                      {debate.language}
                    </p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    md={6}
                    className={classes.durationContainer}
                  >
                    <GridContainer>
                      <GridItem className={classes.duration}>
                        <Button color="primary" round>
                          Challenge
                        </Button>
                        <p>
                          <strong>Duration: </strong>
                          {debate.duration}
                        </p>
                        <p>
                          <strong>42 </strong>Challengers
                        </p>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>

              {/* Footer */}
              <GridItem>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={9}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: 15
                    }}
                  >
                    {debate.topics &&
                      debate.topics.map(topic => (
                        <Badge color="primary" key={topic}>
                          {topic}
                        </Badge>
                      ))}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={3}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                    >
                      <i className={classes.socials + ' fas fa-share'} />
                    </Button>
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                    >
                      <i className={classes.socials + ' far fa-heart'} />
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    </Card>
  );
};

export default DebateCard;
