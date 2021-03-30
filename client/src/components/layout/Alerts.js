import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Alerts = ({ alerts }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (alerts) {
      handleClick();
    }
  }, [alerts]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.root}
        key={alert.id}
      >
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.msg}
        </Alert>
      </Snackbar>
    ))
  );
};
Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});
export default connect(mapStateToProps, {})(Alerts);
