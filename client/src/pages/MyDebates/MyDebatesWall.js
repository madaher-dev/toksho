import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavPills from '../../material/NavPills/NavPills.js';
import Camera from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';

import Guest from '../../views/MyDebates/Guest';
import Host from '../../views/MyDebates/Host';
import CreatDebate from '../../pages/Lounge/Challenges/CreateDebate';

import {
  openModal,
  getMyDebates,
  setLoading
} from '../../store/actions/debateActions';

import styles from '../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles(styles);

const MyDebatesWall = ({
  width,
  openModal,
  getMyDebates,
  setLoading,
  myDebates,
  loading,
  user
}) => {
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

  // This is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const buttonProps = {
    variant: isSmallScreen ? 'round' : 'extended',
    size: isSmallScreen ? 'small' : 'large'
  };
  useEffect(() => {
    setLoading();
    getMyDebates();

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
              <Host
                debates={myDebates}
                loading={loading}
                user={user._id}
                handleOpenSnack={handleOpenSnack}
              />
            ) //debates={debates} loading={loading} />
          },
          {
            tabButton: 'Guest',
            tabIcon: Camera,
            tabContent: (
              <Guest
                debates={myDebates}
                loading={loading}
                user={user._id}
                handleOpenSnack={handleOpenSnack}
              />
            )
          }
        ]}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        //anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnack} severity="info">
          Link Copied to Clipboard!
        </Alert>
      </Snackbar>
      <CreatDebate />
    </div>
  );
};

MyDebatesWall.propTypes = {
  openModal: PropTypes.func.isRequired,
  getMyDebates: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myDebates: state.debates.myDebates,
  loading: state.debates.loading,
  user: state.users.user,
  pusher: state.users.pusher
});

export default connect(mapStateToProps, {
  openModal,
  getMyDebates,
  setLoading
})(withWidth()(MyDebatesWall));
