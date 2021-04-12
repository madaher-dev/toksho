import React from 'react';
import Button from '../../../components/CustomButtons/Button.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import { setChallengeLoading } from '../../../store/actions/debateActions';
const ChallengeButton = ({
  challenge,
  withdraw,
  user,
  debate,
  challengeLoading,
  openChallengers,
  setCurrentDebate
}) => {
  // let myDebate = false;
  // if (debate.user && debate.user._id === user._id) myDebate = true;
  const myDebate = debate.user?._id === user._id ? true : false;
  // let challenger;
  // if (debate.challengers) challenger = debate.challengers.includes(user._id);
  const challenger = debate.challengers?.includes(user._id);
  let loading;
  if (challengeLoading === debate._id) loading = true;

  const handleOpen = () => {
    setCurrentDebate(debate);
    openChallengers();
  };
  return (
    <div>
      {myDebate && debate.challengers.length > 0 ? (
        <Button
          color="primary"
          round
          style={{ margin: 5, padding: 12 }}
          onMouseDown={event => event.stopPropagation()}
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            handleOpen();
          }}
        >
          Pick Guests
        </Button>
      ) : myDebate ? null : challenger ? (
        <Button
          color="github"
          round
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            withdraw();
          }}
          disabled={loading}
          style={{ margin: 5, padding: 12 }}
        >
          Withdraw
        </Button>
      ) : (
        <Button
          color="primary"
          round
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            challenge();
          }}
          disabled={loading}
          style={{ margin: 5, padding: 12 }}
        >
          Challenge
        </Button>
      )}
    </div>
  );
};

ChallengeButton.propTypes = {
  debate: PropTypes.object.isRequired,
  challenge: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  challengeLoading: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.users.user,
  challengeLoading: state.debates.challengeLoading
});
export default connect(mapStateToProps, {})(ChallengeButton);
