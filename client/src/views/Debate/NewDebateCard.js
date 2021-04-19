import React, { useState } from 'react';
import Button from '../../components/CustomButtons/Button.js';
import Card from '../../components/Card/Card.js';
import Badge from '../../components/Badge/Badge.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';
import classNames from 'classnames';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  challenge,
  withdraw,
  setChallengeLoading,
  setLikeLoading,
  like,
  unlike
} from '../../store/actions/debateActions';
//import { handleOpenModal } from '../../store/actions/profileActions';
import ChallengeButton from '../Components/DebateWall/ChallengeButton';
import LikeButton from '../Components/DebateWall/LikeButton';
import Popover from '@material-ui/core/Popover';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import { Link } from 'react-router-dom';
import { cardTitle } from '../../assets/jss/material-kit-react.js';
import Comments from '../../components/Comments/Comments';
import ChallengersList from './ChallengersList';
import LikesList from './LikesList';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const cardstyles = {
  cardTitle
};
const useStyles = makeStyles(styles, cardstyles);

const NewDebateCard = ({
  debate,
  challenge,
  withdraw,
  setChallengeLoading,
  setLikeLoading,
  like,
  unlike
}) => {
  const classes = useStyles();
  const location = useLocation();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [anchorElRight, setAnchorElRight] = useState(null);
  const [openChallengers, setOpenChallengers] = useState(false);
  const [openLikers, setOpenLikers] = useState(false);

  var now = Moment(); //todays date
  //var sched = Moment(debate.schedule); // schedule date
  var created = Moment(debate.createdAt); // schedule date
  var duration = Moment.duration(now.diff(created));
  var days = Math.floor(duration.asDays());
  var hours = Math.floor(duration.asHours());
  var mins = Math.floor(duration.asMinutes());
  var secs = Math.floor(duration.asSeconds());

  const handleChallenge = () => {
    setChallengeLoading(debate._id);
    challenge(debate._id);
  };
  const handleWithdraw = () => {
    setChallengeLoading(debate._id);
    withdraw(debate._id);
  };
  const handleLike = () => {
    setLikeLoading(debate._id);
    like(debate._id);
  };
  const handleUnLike = () => {
    setLikeLoading(debate._id);
    unlike(debate._id);
  };

  const handleCloseChallengersModal = () => {
    setOpenChallengers(false);
  };
  const handleCloseLikesModal = () => {
    setOpenLikers(false);
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

  let abandoned;
  if (new Date(debate.schedule) < Date.now()) abandoned = true;

  let title;
  if (abandoned) title = 'Abandoned';
  else if (debate.status === 'new') title = 'Accepting Challengers';

  return (
    <Card>
      <Helmet>
        <title>{debate.title} - Toksho </title>
        <meta name="description" content={debate.synopsis} />

        <meta itemprop="name" content={`${debate.title} - Toksho`} />
        <meta itemprop="description" content={debate.synopsis} />
        <meta
          itemprop="image"
          content={`${process.env.REACT_APP_WEBSITE_NAME}${profileImage}`}
        />

        <meta
          property="og:url"
          content={`${process.env.REACT_APP_WEBSITE_NAME}${profileImage}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${debate.title} - Toksho`} />
        <meta property="og:description" content={debate.synopsis} />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_WEBSITE_NAME}${profileImage}`}
        />

        <meta
          name="twitter:card"
          content={`${process.env.REACT_APP_WEBSITE_NAME}${profileImage}`}
        />
        <meta name="twitter:title" content={`${debate.title} - Toksho`} />
        <meta name="twitter:description" content={debate.synopsis} />
        <meta
          name="twitter:image"
          content={`${process.env.REACT_APP_WEBSITE_NAME}${profileImage}`}
        />
      </Helmet>
      <GridItem>
        <h4 className={classes.cardTitle}>{title}</h4>
      </GridItem>
      <GridItem>
        <GridContainer style={{ paddingTop: 10 }} spacing={0}>
          <GridItem xs={4} sm={2} xl={1}>
            <img src={profileImage} alt="..." className={imageClasses} />
          </GridItem>
          <GridItem xs={8} sm={10} xl={11}>
            <GridContainer spacing={0}>
              <GridItem>
                <GridContainer spacing={0}>
                  <GridItem xs={12}>
                    <Link
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
                  <GridItem>
                    <GridContainer
                      wrap="nowrap"
                      className={classes.debateTitle}
                      spacing={0}
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
                <GridContainer spacing={0}>
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
                    <GridContainer spacing={0}>
                      <GridItem className={classes.duration}>
                        <ChallengeButton
                          challenge={handleChallenge}
                          withdraw={handleWithdraw}
                          debate={debate}
                        />

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
                        {debate.challengers && debate.challengers.length > 0 ? (
                          <Button
                            onClick={() => setOpenChallengers(true)}
                            className={classes.linkButton}
                          >
                            <strong>
                              {debate.challengers.length} Challengers{' '}
                            </strong>{' '}
                          </Button>
                        ) : (
                          <p>
                            <strong>0 </strong>
                            Challengers
                          </p>
                        )}
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
                      alignItems: 'center',
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
                      alignItems: 'flex-end',
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
                          url={window.location.href}
                          beforeOnClick={() => setAnchorElRight(null)}
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <TwitterShareButton
                          url={window.location.href}
                          beforeOnClick={() => setAnchorElRight(null)}
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                      </div>
                    </Popover>

                    <LikeButton
                      unlike={handleUnLike}
                      like={handleLike}
                      debate={debate}
                    />
                    <Button
                      onClick={() => setOpenLikers(true)}
                      className={classes.linkButton}
                    >
                      {debate.likes.length > 0 ? debate.likes.length : null}
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <Comments debate={debate._id} />
      <ChallengersList
        open={openChallengers}
        debate={debate}
        handleCloseModal={handleCloseChallengersModal}
      />
      <LikesList
        open={openLikers}
        debate={debate}
        handleCloseModal={handleCloseLikesModal}
      />
    </Card>
  );
};

NewDebateCard.propTypes = {
  debate: PropTypes.object.isRequired,
  challenge: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired,
  setLikeLoading: PropTypes.func.isRequired,
  setChallengeLoading: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
  //handleOpenModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  debates: state.debates.debates
});
export default connect(mapStateToProps, {
  challenge,
  withdraw,
  setChallengeLoading,
  setLikeLoading,
  like,
  unlike
  //handleOpenModal
})(NewDebateCard);
