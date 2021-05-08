import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../material/CustomButtons/Button.js';
import Card from '../../material/Card/Card.js';
import Badge from '../../material/Badge/Badge.js';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import Popover from '@material-ui/core/Popover';

import ChallengersList from '../../components/Debate/ChallengersList';
import LikeButton from '../../components/Debates/LikeButton';
import Guests from '../../components/Debates/Guests';
import Comments from '../../components/Comments/Comments';
import LikesList from '../../components/Debate/LikesList';
import ReadDebateMeta from '../../meta/ReadyDebateMeta';
import PlayerFrame from '../../components/Debate/PlayerFrame';
import ShareButtons from '../../components/Debates/ShareButtons';

import {
  setLikeLoading,
  like,
  unlike
} from '../../store/actions/debateActions';

import classNames from 'classnames';
import { cardTitle } from '../../assets/jss/material-kit-react.js';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const cardstyles = {
  cardTitle
};
const useStyles = makeStyles(styles, cardstyles);

const EndedDebateView = ({ debate, setLikeLoading, like, unlike, user }) => {
  const classes = useStyles();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleOpenSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [anchorElRight, setAnchorElRight] = React.useState(null);
  const [openChallengers, setOpenChallengers] = React.useState(false);
  const [openLikers, setOpenLikers] = React.useState(false);

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
        : debate.user.photo;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }

  const guestList = debate?.guests.map(guest => guest?._id);

  let admin;
  let myDebate;
  if (debate.user._id === user?._id) admin = true;
  if (admin || guestList?.includes(user?._id)) myDebate = true;

  const live = debate.status === 'joined' ? true : false;
  const joined = debate.joinedUsers?.includes(user?._id);
  let abandoned;
  if (new Date(debate.endDate) < Date.now() && debate.status === 'ready')
    abandoned = true;

  return (
    <Card>
      <ReadDebateMeta debate={debate} image={profileImage} />
      <GridItem>
        <h4 className={classes.cardTitle}>{debate.title}</h4>
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
                        to={`/${debate.user?.handler}`}
                        className={classes.link}
                      >
                        {' '}
                        <strong>{debate.user?.name} </strong>
                      </Link>
                      @{debate.user?.handler}
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
                    <GridItem className={classes.playerContainer}>
                      <PlayerFrame url={debate.youtubeVideoURL} />
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
                          {debate.challengers &&
                          debate.challengers.length > 0 ? (
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
                        alignItems: 'flex-end',
                        paddingBottom: 15
                      }}
                    >
                      <GridContainer>
                        {debate.topics &&
                          debate.topics.map(topic => (
                            <Link
                              onClick={event => {
                                event.stopPropagation();
                                //event.preventDefault();
                              }}
                              to={`/search?topic=${topic}`}
                              //className={classes.link}
                              key={topic}
                            >
                              <Badge color="primary">{topic}</Badge>
                            </Link>
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
                        <ShareButtons
                          debate={debate}
                          setAnchorElRight={setAnchorElRight}
                          handleOpenSnack={handleOpenSnack}
                        />
                      </Popover>

                      <LikeButton
                        unlike={handleUnLike}
                        like={handleLike}
                        debate={debate}
                        disabled={user ? false : true}
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
        <GridItem style={{ marginLeft: 10 }}>
          <Guests
            guests={debate.guests}
            schedule={debate.schedule}
            myDebate={myDebate}
            live={live}
            abandoned={abandoned}
            joined={joined}
          />
        </GridItem>
      </GridContainer>
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
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="info">
          Link Copied to Clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

EndedDebateView.propTypes = {
  debate: PropTypes.object.isRequired,
  setLikeLoading: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  debates: state.debates.readyDebates,
  user: state.users.user
});
export default connect(mapStateToProps, {
  setLikeLoading,
  like,
  unlike
})(EndedDebateView);
