import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import Favorite from '@material-ui/icons/Favorite';
// core components
import Header from '../../material/Header/Header.js';
import Footer from '../../material/Footer/Footer.js';
import Button from '../../material/CustomButtons/Button.js';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import HeaderLinks from '../../material/Header/HeaderLinks.js';
import NavPills from '../../material/NavPills/NavPills.js';
import Parallax from '../../material/Parallax/Parallax.js';

import studio1 from '../../assets/img/examples/studio-1.jpg';
import studio3 from '../../assets/img/examples/studio-3.jpg';
import work1 from '../../assets/img/examples/olu-eletu.jpg';
import work2 from '../../assets/img/examples/clem-onojeghuo.jpg';
import work4 from '../../assets/img/examples/mariya-georgieva.jpg';
import bg from '../../assets/img/profile-bg.jpg';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByHandler } from '../../store/actions/profileActions';
import {
  getDebatesByHandler,
  setLoading,
  getMyDebates
} from '../../store/actions/debateActions';
import NoProfile from './NoProfile';
import Host from '../MyDebates/Host';
import Guest from '../MyDebates/Guest';
const useStyles = makeStyles(styles);

const ProfilePage = props => {
  const classes = useStyles();
  const {
    user,
    profile,
    getProfileByHandler,
    noProfile,
    userProfile,
    getDebatesByHandler,
    userDebates,
    loading,
    setLoading,
    getMyDebates,
    myDebates
  } = props;
  const { ...rest } = props;
  const [myPage, setMyPage] = useState(false);
  useEffect(() => {
    if (user.handler === profile || !profile) {
      setMyPage(true);
      setLoading();
      getMyDebates();
    } else {
      getProfileByHandler(profile);
      getDebatesByHandler(profile);
    }
  }, [
    profile,
    user,
    getProfileByHandler,
    getDebatesByHandler,
    setLoading,
    getMyDebates
  ]);
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const myProfileImage =
    user.photo === 'null'
      ? '/static/images/avatars/default-profile.png'
      : `/static/images/avatars/${user.photo}`;
  let userProfileImage;
  if (userProfile) {
    userProfileImage =
      userProfile.photo === 'null'
        ? '/static/images/avatars/default-profile.png'
        : `/static/images/avatars/${userProfile.photo}`;
  }

  if (noProfile) {
    return <NoProfile />;
  } else {
    return (
      <div>
        <Header
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: 'white'
          }}
          {...rest}
        />
        <Parallax small filter image={bg} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img
                        src={myPage ? myProfileImage : userProfileImage}
                        alt="..."
                        className={imageClasses}
                      />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>
                        {myPage && user
                          ? user.name
                          : userProfile
                          ? userProfile.name
                          : null}
                      </h3>
                      <p>
                        {myPage && user ? '@' : userProfile ? '@' : null}
                        {myPage && user
                          ? user.handler
                          : userProfile
                          ? userProfile.handler
                          : null}
                      </p>
                      <Button justIcon link className={classes.margin5}>
                        <i className={'fab fa-twitter'} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={'fab fa-instagram'} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={'fab fa-facebook'} />
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem className={classes.description}>
                  <p style={{ overflowWrap: 'break-word' }}>
                    {myPage && user
                      ? user.bio
                      : userProfile
                      ? userProfile.bio
                      : null}
                  </p>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: 'Host',
                        tabIcon: Camera,
                        tabContent: (
                          <div>
                            {myPage ? (
                              <Host
                                debates={myDebates}
                                loading={loading}
                                user={user?._id}
                              />
                            ) : (
                              <Host
                                debates={userDebates}
                                loading={loading}
                                user={userProfile?._id}
                              />
                            )}
                          </div>
                        )
                      },
                      {
                        tabButton: 'Guest',
                        tabIcon: Palette,
                        tabContent: (
                          <div>
                            {myPage ? (
                              <Guest
                                debates={myDebates}
                                loading={loading}
                                user={user?._id}
                              />
                            ) : (
                              <Guest
                                debates={userDebates}
                                loading={loading}
                                user={userProfile?._id}
                              />
                            )}
                          </div>
                        )
                      },
                      {
                        tabButton: 'Activity',
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                    style={{ backgroundColor: 'red' }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

ProfilePage.propTypes = {
  user: PropTypes.object,
  userDebates: PropTypes.array.isRequired,
  getDebatesByHandler: PropTypes.func.isRequired,
  profile: PropTypes.string,
  getProfileByHandler: PropTypes.func.isRequired,
  noProfile: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  getMyDebates: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  userProfile: state.profiles.profile,
  userDebates: state.debates.userDebates,
  noProfile: state.profiles.noProfile,
  loading: state.debates.loading,
  myDebates: state.debates.myDebates
});

export default connect(mapStateToProps, {
  getProfileByHandler,
  getDebatesByHandler,
  setLoading,
  getMyDebates
})(ProfilePage);
