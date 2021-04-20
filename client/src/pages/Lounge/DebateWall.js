import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Camera from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';

import Challenges from './Challenges/Challenges';
import Upcomming from './Upcomming/Upcomming';
import Live from './Live/Live';
import NavPills from '../../material/NavPills/NavPills.js';
import CreatDebate from './Challenges/CreateDebate';

import { openModal } from '../../store/actions/debateActions';

import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const DebateWall = ({ width, openModal, joined }) => {
  const classes = useStyles();
  // This is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const buttonProps = {
    variant: isSmallScreen ? 'round' : 'extended',
    size: isSmallScreen ? 'small' : 'large'
  };
  // useEffect(() => {
  //   setLoading();
  //   getAllDebates();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  if (joined) {
    return <Redirect to={`/debates/${joined}`} />;
  }
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
            tabButton: 'Challenges',
            tabContent: <Challenges /> //debates={debates} loading={loading} />
          },
          {
            tabButton: 'Upcoming',
            tabIcon: Camera,
            tabContent: <Upcomming />
          },
          {
            tabButton: 'Live',
            tabIcon: Camera,
            tabContent: <Live />
          }
        ]}
      />

      <CreatDebate />
    </div>
  );
};

DebateWall.propTypes = {
  openModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  joined: state.debates.joined
});

export default connect(mapStateToProps, {
  openModal
})(withWidth()(DebateWall));
