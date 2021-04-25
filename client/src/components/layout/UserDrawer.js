import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import HomeIcon from '@material-ui/icons/Home';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import StarsIcon from '@material-ui/icons/Stars';
import PersonIcon from '@material-ui/icons/Person';
import { Link, useLocation } from 'react-router-dom';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),

    [theme.breakpoints.up('md')]: {
      paddingLeft: 20
    }
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(9) + 1
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  // customHoverFocus: {
  // '&:hover, &.Mui-focusVisible': {
  //   color: theme.palette.primary.main
  // }
  // },
  //parentHover: {
  parentHover: {
    // backgroundColor: 'yellow',
    '&:hover $childHover': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    '&:hover, &.Mui-focusVisible': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },

    '&,&:focus': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  childHover: {
    //color: 'red'
  },
  active: {
    color: theme.palette.primary.main,
    '&:hover,&:focus': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    }
  }
}));

const UserDrawer = ({ logout }) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const isActiveParent = value =>
    location.pathname === value ? classes.active : classes.parentHover;
  const isActiveChild = value =>
    location.pathname === value ? classes.active : classes.childHover;
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: matches,
          [classes.drawerClose]: !matches
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: matches,
            [classes.drawerClose]: !matches
          })
        }}
      >
        <List>
          <ListItem>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              component={Link}
              to="/home"
              edge="start"
            >
              <VoiceChatIcon color="primary" />
            </IconButton>
          </ListItem>
          <ListItem
            component={Link}
            to="/home"
            key={'lounge'}
            className={isActiveParent('/home')}
          >
            <ListItemIcon color="inherit" className={isActiveChild('/home')}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Lounge'} />
          </ListItem>
          <ListItem
            component={Link}
            to="/mydebates"
            key={'mydebates'}
            className={isActiveParent('/mydebates')}
          >
            <ListItemIcon
              color="inherit"
              className={isActiveChild('/mydebates')}
            >
              <RecordVoiceOverIcon />
            </ListItemIcon>
            <ListItemText primary={'My Debates'} />
          </ListItem>
          <ListItem
            component={Link}
            to="/watch"
            key={'watch'}
            className={isActiveParent('/watch')}
          >
            <ListItemIcon className={isActiveChild('/watch')}>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={'Watch'} />
          </ListItem>
          <ListItem
            button
            key={'notifications'}
            className={classes.parentHover}
          >
            <ListItemIcon className={classes.childHover}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary={'Notifications'} />
          </ListItem>
          <ListItem button key={'messages'} className={classes.parentHover}>
            <ListItemIcon className={classes.childHover}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'Messages'} />
          </ListItem>
          <ListItem button key={'favorites'} className={classes.parentHover}>
            <ListItemIcon className={classes.childHover}>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary={'Favorites'} />
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="/profile"
            key={'profile'}
            className={isActiveParent('/profile')}
          >
            <ListItemIcon color="inherit" className={isActiveChild('/profile')}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>
          <ListItem
            component={Link}
            to="/settings"
            key={'settings'}
            className={isActiveParent('/settings')}
          >
            <ListItemIcon
              color="inherit"
              className={isActiveChild('/settings')}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              logout();
            }}
            key={'logout'}
            className={classes.parentHover}
          >
            <ListItemIcon color="inherit" className={classes.childHover}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

UserDrawer.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  logout
})(UserDrawer);
