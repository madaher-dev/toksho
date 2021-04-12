import React from 'react';
import Button from '../../../components/CustomButtons/Button.js';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/challengersStyle';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

const PickButton = ({
  pick,
  unpick,
  challenger,
  pickLoading,
  debate,
  debates,
  sourcePage,
  myDebates
}) => {
  const classes = useStyles();

  let currentDebate;
  if (sourcePage === 'host') {
    currentDebate = myDebates.find(newDebate => newDebate._id === debate?._id);
  } else
    currentDebate = debates.find(newDebate => newDebate._id === debate?._id);

  const guestList = currentDebate?.guests.map(guest => guest?._id);

  let guest = guestList?.includes(challenger?._id);

  let loading;
  if (pickLoading === challenger._id) loading = true;
  let max;
  if (currentDebate?.guests.length >= 4) max = true;
  return (
    <div>
      {guest ? (
        <Button
          color="primary"
          round
          onClick={unpick}
          className={classes.buttonFilled}
          disabled={loading}
        >
          UnPick
        </Button>
      ) : !max ? (
        <Button
          color="transparent"
          round
          className={classes.button}
          onClick={pick}
          disabled={loading}
        >
          Pick
        </Button>
      ) : null}
    </div>
  );
};

PickButton.propTypes = {
  pick: PropTypes.func.isRequired,
  unpick: PropTypes.func.isRequired,
  challenger: PropTypes.object.isRequired,
  pickLoading: PropTypes.string,
  debate: PropTypes.object.isRequired,
  sourcePage: PropTypes.string
};

const mapStateToProps = state => ({
  pickLoading: state.profiles.pickLoading,
  debates: state.debates.debates,
  myDebates: state.debates.myDebates
});
export default connect(mapStateToProps, {})(PickButton);
