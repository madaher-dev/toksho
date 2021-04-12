import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import Challenges from './Challenges';
import Upcomming from '../UpcommingDebates/Upcomming';
import NavPills from '../../../components/NavPills/NavPills.js';
import Camera from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';
import CreatDebate from './CreatDebate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../../store/actions/debateActions';

const useStyles = makeStyles(styles);

const DebateWall = ({ width, openModal }) => {
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
            tabContent: (
              <span>
                <p>
                  Completely synergize resource taxing relationships via premier
                  niche markets. Professionally cultivate one-to-one customer
                  service with robust ideas.{' '}
                </p>
                <br />
                <p>
                  Dynamically innovate resource-leveling customer service for
                  state of the art customer service.
                </p>
              </span>
            )
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  openModal
})(withWidth()(DebateWall));
