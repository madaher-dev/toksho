import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../material/CustomButtons/Button.js';

import { handleOpenModal } from '../../store/actions/profileActions';

const ChallengeButton = ({
  challenge,
  withdraw,
  user,
  debate,
  challengeLoading,
  handleOpenModal
}) => {
  const myDebate = debate.user?._id === user._id ? true : false;
  const challenger = debate.challengers?.includes(user._id);
  let loading;
  if (challengeLoading === debate._id) loading = true;

  let abandoned;
  if (new Date(debate.schedule) < Date.now()) abandoned = true;

  const handleOpen = () => {
    handleOpenModal(debate);
  };
  return (
    <div>
      {myDebate && debate.challengers.length > 0 && !abandoned ? (
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
      ) : myDebate ? null : challenger && !abandoned ? (
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
      ) : !abandoned ? (
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
      ) : null}
    </div>
  );
};

ChallengeButton.propTypes = {
  debate: PropTypes.object.isRequired,
  challenge: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  challengeLoading: PropTypes.string,
  handleOpenModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  challengeLoading: state.debates.challengeLoading
});
export default connect(mapStateToProps, { handleOpenModal })(ChallengeButton);
