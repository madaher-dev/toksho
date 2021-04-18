import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import Pusher from 'pusher-js';
import Guest from './Guest';
import Host from './Host';
import NavPills from '../../components/NavPills/NavPills.js';
import Camera from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';
import CreatDebate from '../Components/DebateWall/CreatDebate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  openModal,
  getMyDebates,
  setLoading,
  pushLike,
  pushChallenge,
  pushReady,
  pushLive
} from '../../store/actions/debateActions';
import { pushPick } from '../../store/actions/profileActions';

const useStyles = makeStyles(styles);

const MyDebatesWall = ({
  width,
  openModal,
  getMyDebates,
  setLoading,
  myDebates,
  loading,
  user,
  pushLike,
  pushChallenge,
  pushReady,
  pushLive
}) => {
  const classes = useStyles();
  // This is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const buttonProps = {
    variant: isSmallScreen ? 'round' : 'extended',
    size: isSmallScreen ? 'small' : 'large'
  };
  useEffect(() => {
    setLoading();
    getMyDebates();
    const pusher = new Pusher('3112d5ae0257895cff95', {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('debates');
    channel.bind('like', data => {
      let newData = {};
      newData.data = data;
      pushLike(newData);
    });

    channel.bind('challenge', data => {
      let newData = {};
      newData.data = data;
      pushChallenge(newData);
    });
    channel.bind('pick', data => {
      let newData = {};
      newData.data = data;
      pushPick(newData);
    });
    channel.bind('ready', data => {
      let newData = {};
      newData.data = data;
      pushReady(newData);
    });

    channel.bind('joined', data => {
      let newData = {};
      newData.data = data;
      pushLive(newData);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Fab
        {...buttonProps}
        color="primary"
        aria-label="add"
        className={classes.cta}
        onClick={() => openModal()}
      >
        <AddIcon />
        {!isSmallScreen ? 'Host a Debate' : null}
      </Fab>
      <NavPills
        color="primary"
        tabs={[
          {
            tabIcon: Camera,
            tabButton: 'Host',
            tabContent: (
              <Host debates={myDebates} loading={loading} user={user._id} />
            ) //debates={debates} loading={loading} />
          },
          {
            tabButton: 'Guest',
            tabIcon: Camera,
            tabContent: (
              <Guest debates={myDebates} loading={loading} user={user._id} />
            )
          }
        ]}
      />
      <CreatDebate />
    </div>
  );
};

MyDebatesWall.propTypes = {
  openModal: PropTypes.func.isRequired,
  getMyDebates: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  pushLike: PropTypes.func.isRequired,
  pushChallenge: PropTypes.func.isRequired,
  pushPick: PropTypes.func.isRequired,
  pushReady: PropTypes.func.isRequired,
  pushLive: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myDebates: state.debates.myDebates,
  loading: state.debates.loading,
  user: state.users.user
});

export default connect(mapStateToProps, {
  openModal,
  getMyDebates,
  setLoading,
  pushLike,
  pushChallenge,
  pushPick,
  pushReady,
  pushLive
})(withWidth()(MyDebatesWall));
