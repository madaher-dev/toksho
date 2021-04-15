import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import Challenges from './Challenges';
import Upcomming from '../UpcommingDebates/Upcomming';
import Live from '../UpcommingDebates/Live';
import NavPills from '../../../components/NavPills/NavPills.js';
import Camera from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';
import CreatDebate from './CreatDebate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../../store/actions/debateActions';
import { Redirect } from 'react-router';
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
