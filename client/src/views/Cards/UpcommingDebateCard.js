import React from 'react';
import Button from '../../material/CustomButtons/Button.js';
import Card from '../../material/Card/Card.js';
import Badge from '../../material/Badge/Badge.js';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import classNames from 'classnames';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setLikeLoading,
  like,
  unlike,
  setJoin
} from '../../store/actions/debateActions';

import LikeButton from '../../components/Debates/LikeButton';
import Popover from '@material-ui/core/Popover';
import { FacebookShareButton } from 'react-share';
import Guests from '../../components/Debates/Guests';
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';
import { cardTitle } from '../../assets/jss/material-kit-react.js';
import { Redirect } from 'react-router';

const cardstyles = {
  cardTitle
};
const useStyles = makeStyles(styles, cardstyles);

const DebateCard = ({
  debate,
  setLikeLoading,
  like,
  unlike,
  user,
  setJoin
}) => {
  const classes = useStyles();
  const history = useHistory();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [anchorElRight, setAnchorElRight] = React.useState(null);

  var now = Moment(); //todays date
  // var sched = Moment(debate.schedule); // schedule date
  var created = Moment(debate.createdAt); // schedule date
  var duration = Moment.duration(now.diff(created));
  var days = Math.floor(duration.asDays());
  var hours = Math.floor(duration.asHours());
  var mins = Math.floor(duration.asMinutes());
  var secs = Math.floor(duration.asSeconds());

  const handleLike = () => {
    setLikeLoading(debate._id);
    like(debate._id);
  };
  const handleUnLike = () => {
    setLikeLoading(debate._id);
    unlike(debate._id);
  };
  const handleJoin = () => {
    setJoin(debate._id);
  };
  let profileImage;
  if (debate.user) {
    profileImage =
      debate.user.photo === 'null'
        ? '/static/images/avatars/default-profile.png'
        : `/static/images/avatars/${debate.user.photo}`;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }

  const guestList = debate?.guests.map(guest => guest?._id);

  let myDebate;
  if (debate.user._id === user._id || guestList?.includes(user?._id))
    myDebate = true;

  const live = debate.status === 'joined' ? true : false;
  const joined = debate.joinedUsers?.includes(user._id);

  if (joined && new Date(debate.endDate) > Date.now()) {
    return <Redirect to={`/debates/${debate._id}`} />;
  }

  let abandoned;
  if (new Date(debate.endDate) < Date.now() && debate.status === 'ready')
    abandoned = true;

  let title;
  if (abandoned) title = 'Abandoned';
  else if (debate.status === 'ready') title = 'Upcomming';
  else if (debate.status === 'joined' && new Date(debate.endDate) < Date.now())
    title = 'Ended';
  else if (debate.status === 'joined' && new Date(debate.endDate) > Date.now())
    title = 'Live';

  return (
    <Card>
      <CardActionArea
        component="span"
        onClick={() => history.push(`/debates/${debate._id}`)}
        disableRipple={true}
      >
        <GridItem>
          <h4 className={classes.cardTitle}>{title}</h4>
        </GridItem>
        <GridContainer style={{ paddingTop: 10, width: '100%' }}>
          <GridItem>
            <GridContainer>
              <GridItem xs={4} sm={2} xl={1}>
                <img
                  src={profileImage}
                  alt="..."
                  className={imageClasses}
                  style={{ marginLeft: 10 }}
                />
              </GridItem>
              <GridItem xs={8} sm={10} xl={11}>
                <GridContainer>
                  <GridItem>
                    <GridContainer>
                      <GridItem xs={12}>
                        <Link
                          onClick={event => {
                            event.stopPropagation();
                            //event.preventDefault();
                          }}
                          to={`/${debate.user?.handler}`}
                          className={classes.link}
                        >
                          {' '}
                          <strong>{debate.user?.name} </strong>
                        </Link>
                        @{debate.user?.handler}{' '}
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
                      <GridItem xs={12}>
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
                      <GridItem xs={12}>
                        <GridContainer
                          wrap="nowrap"
                          className={classes.debateTitle}
                        >
                          <GridItem zeroMinWidth>
                            <p
                              className={classes.description}
                              style={{ overflowWrap: 'break-word' }}
                            >
                              {debate.synopsis}
                            </p>
                          </GridItem>
                        </GridContainer>
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
                            <p>
                              <strong>Duration: </strong>
                              {debate.duration === '30'
                                ? '30 mins'
                                : debate.duration === '45'
                                ? '45 mins'
                                : debate.duration === '60'
                                ? '1 hr'
                                : null}
                            </p>
                            <p>
                              <strong>
                                {debate.challengers &&
                                  debate.challengers.length}{' '}
                              </strong>
                              Challengers
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
                        <GridContainer>
                          {debate.topics &&
                            debate.topics.map(topic => (
                              <Badge color="primary" key={topic}>
                                {topic}
                              </Badge>
                            ))}
                        </GridContainer>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={3}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            setAnchorElRight(event.currentTarget);
                          }}
                        >
                          <i className={classes.socials + ' fas fa-share'} />
                        </Button>
                        <Popover
                          classes={{
                            paper: classes.popover
                          }}
                          open={Boolean(anchorElRight)}
                          anchorEl={anchorElRight}
                          onClose={() => setAnchorElRight(null)}
                          anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left'
                          }}
                        >
                          <div>
                            <FacebookShareButton
                              url="/test"
                              beforeOnClick={() => setAnchorElRight(null)}
                            >
                              <Button
                                justIcon
                                color="transparent"
                                className={classes.margin5}
                                onClick={event => {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  setAnchorElRight(event.currentTarget);
                                }}
                              >
                                <i
                                  className={classes.socials + ' fas fa-share'}
                                />
                              </Button>
                            </FacebookShareButton>
                          </div>
                          <div>
                            <FacebookShareButton url="/test">
                              <Button
                                justIcon
                                color="transparent"
                                className={classes.margin5}
                                onClick={event => {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  setAnchorElRight(event.currentTarget);
                                }}
                              >
                                <i
                                  className={classes.socials + ' fas fa-share'}
                                />
                              </Button>
                            </FacebookShareButton>
                          </div>
                        </Popover>
                        <LikeButton
                          unlike={handleUnLike}
                          like={handleLike}
                          debate={debate}
                        />
                        <h4>
                          {debate.likes.length > 0 ? debate.likes.length : null}
                        </h4>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem style={{ marginLeft: 10 }}>
            <Guests
              guests={debate.guests}
              schedule={debate.schedule}
              myDebate={myDebate}
              handleJoin={handleJoin}
              live={live}
              abandoned={abandoned}
              joined={joined}
            />
          </GridItem>
        </GridContainer>
      </CardActionArea>
    </Card>
  );
};

DebateCard.propTypes = {
  debate: PropTypes.object.isRequired,
  setJoin: PropTypes.func.isRequired,
  setLikeLoading: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user
});
export default connect(mapStateToProps, {
  setLikeLoading,
  like,
  unlike,
  setJoin
})(DebateCard);
