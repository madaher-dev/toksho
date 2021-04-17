import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Footer from '../layout/Footer';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import SignupModal from './SignupModal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkUser } from '../../store/actions/userActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  lowerImage: {
    backgroundImage: 'url(/resources/images/login.jpg)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    height: 300
  },
  imageBox: {
    display: 'flex',
    flexGrow: 1,
    backgroundImage: 'url(/resources/images/login.jpg)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    [theme.breakpoints.up('sm')]: {
      height: '100vh'
    }
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

    height: '100vh'
  },

  subContainer: {
    display: 'flex',
    flexGrow: 1
  },
  rightColumn: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      paddingLeft: 40
    },
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start'
    }
  },
  roundedButton: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      paddingLeft: 40,
      width: 350
    },
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    marginTop: 20,
    backgroundColor: '#A74A5A',
    transition: 'ease',
    '&:hover': {
      backgroundColor: '#741b31'
    },

    '&:disabled': {
      cursor: 'default',
      opacity: 1
    },
    color: 'white',
    borderRadius: 25,
    textTransform: 'none',
    cursor: 'pointer',
    boxShadow: 'lightgray',
    height: 45
  },
  roundedButtonLight: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      paddingLeft: 40,
      width: 350
    },
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'ridge',
    borderColor: '#A74A5A',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    transition: 'ease',
    '&:hover': {
      backgroundColor: '#CEBCBC',
      color: '#A74A5A'
    },

    '&:disabled': {
      cursor: 'default',
      opacity: 1
    },
    color: '#A74A5A',
    borderRadius: 25,

    textTransform: 'none',
    cursor: 'pointer',
    height: 45,
    overflow: 'hidden'
  }
}));

const Landing = ({ isAuthenticated, checkUser, match }) => {
  useEffect(() => {
    checkUser();
    //Open the signup modal in case of /signup/open
    if (match.params.id === 'open') setOpen(true);
    // eslint-disable-next-line
  }, []);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Grid container className={classes.container} direction="column">
        <Grid item container className={classes.subContainer}>
          <Grid item xs={false} sm={6} className={classes.imageBox}></Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.rightColumn}
            container
            direction="column"
          >
            <Grid item>
              <VoiceChatIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <Typography
                variant="h2"
                style={{ paddingTop: 30, paddingBottom: 30 }}
              >
                Let's Debate
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                >
                  Join TokSho Today.
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.roundedButton}
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.roundedButtonLight}
                  color="primary"
                  component={Link}
                  to="/login"
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
            <SignupModal open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
        <Grid item className={classes.lowerImage}></Grid>
        <Footer />
      </Grid>
    );
  }
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  checkUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { checkUser })(Landing);
