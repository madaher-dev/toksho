import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Moment from 'moment';
import { Link } from 'react-router-dom';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  privacy: {
    textDecoration: 'none',
    color: '#343941'
  }
}));

const Footer = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      color={width < 600 ? 'primary' : 'transparent'}
    >
      <Toolbar variant="dense">
        <Typography className={classes.privacy}>
          TokSho Copyright &copy;{Moment(Date.now()).format('YYYY')} v0.1.0
        </Typography>

        <div className={classes.grow} />
        <Typography
          component={Link}
          to={'/privacy'}
          className={classes.privacy}
        >
          Privacy Policy
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
