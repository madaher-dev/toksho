import {
  CLEAR_ERRORS,
  SET_DEBATE_LOADING,
  OPEN_CREATE_DEBATE,
  CLOSE_CREATE_DEBATE,
  SET_CHALLENGE_LOADING,
  SET_LIKE_LOADING,
  DEBATE_ADDED,
  DEBATE_ERROR,
  LIKE_MODIFIED,
  CHALLENGE_WITHDRAW,
  DEBATE_READY,
  DEBATE_JOINED,
  SET_ENDED,
  DEBATE_ENDED
} from './Types';
import axios from 'axios';

const factory = require('./actionsFactory');
const date = Date.now();
// Create New Debate
export const createDebate = values => async dispatch => {
  if (values.duration === '30 mins') values.duration = 30;
  else if (values.duration === '45 mins') values.duration = 45;
  else if (values.duration === '1 hr') values.duration = 60;

  values.endDate = new Date(
    values.schedule.getTime() + values.duration * 60000
  );
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/v1/debates/`, values, config);

    dispatch({
      type: DEBATE_ADDED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DEBATE_ERROR,
      payload: err.response.data.message
    });
  }
};
// export const createNewDebate = values =>
//   factory.post(values, '/api/v1/debates/', 'DEBATE_ADDED', 'DEBATE_ERROR');
// Get all challenges

export const getAllDebates = () =>
  factory.get(
    `/api/v1/debates?status=new&schedule[gte]=${date}`,
    'GET_NEW_DEBATES',
    'DEBATE_ERROR'
  );

// Get Ready debates

export const getReadyDebates = () =>
  factory.get(
    `/api/v1/debates?status=ready&endDate[gte]=${date}`,
    'GET_READY_DEBATES',
    'DEBATE_ERROR'
  );

// Get Live debates

export const getLiveDebates = () =>
  factory.get(
    `/api/v1/debates?status=joined&endDate[gte]=${date}`,
    'GET_LIVE_DEBATES',
    'DEBATE_ERROR'
  );

export const getEndedDebates = () =>
  factory.get(
    `/api/v1/debates?status=videoReady`,
    'GET_ENDED_DEBATES',
    'DEBATE_ERROR'
  );

export const getMyDebates = () =>
  factory.get(`/api/v1/debates/my`, 'GET_MY_DEBATES', 'DEBATE_ERROR');

// Challenge

export const challenge = debate =>
  factory.get(
    `/api/v1/debates/challenge/${debate}`,
    'CHALLENGE_WITHDRAW',
    'DEBATE_ERROR'
  );

// Withdraw

export const withdraw = debate =>
  factory.get(
    `/api/v1/debates/withdraw/${debate}`,
    'CHALLENGE_WITHDRAW',
    'DEBATE_ERROR'
  );
// Like

export const like = debate =>
  factory.get(
    `/api/v1/debates/like/${debate}`,
    'LIKE_MODIFIED',
    'DEBATE_ERROR'
  );

// UnLike

export const unlike = debate =>
  factory.get(
    `/api/v1/debates/unlike/${debate}`,
    'LIKE_MODIFIED',
    'DEBATE_ERROR'
  );

// SET Debate as ready (upcomming)

export const setReady = debate =>
  factory.get(
    `/api/v1/debates/ready/${debate}`,
    'DEBATE_READY',
    'DEBATE_ERROR'
  );

// SET Debate as joined (Live)

export const setJoin = debate =>
  factory.get(
    `/api/v1/debates/join/${debate}`,
    'DEBATE_JOINED',
    'DEBATE_ERROR'
  );

// Get User debates by handler
export const getDebatesByHandler = handler =>
  factory.get(
    `/api/v1/debates/user/${handler}`,
    'GET_PROFILE_DEBATES',
    'DEBATE_ERROR'
  );

// Get single debate
export const getDebate = debate =>
  factory.get(
    `/api/v1/debates/debate/${debate}`,
    'GET_SINGLE_DEBATE',
    'DEBATE_ERROR'
  );

// Set Debate ended (removed joined and stop redirect -- need to implement backend?)
export const setEnded = debate => ({
  type: SET_ENDED,
  payload: debate
});
// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_DEBATE_LOADING });

// Open Create Debate Form
export const openModal = () => ({ type: OPEN_CREATE_DEBATE });

// Open Create Debate Form
export const closeModal = () => ({ type: CLOSE_CREATE_DEBATE });

// Set CHALLENGE Loading
export const setChallengeLoading = debate => ({
  type: SET_CHALLENGE_LOADING,
  payload: debate
});

// Set CHALLENGE Loading
export const setLikeLoading = debate => ({
  type: SET_LIKE_LOADING,
  payload: debate
});

// Push Like
export const pushLike = debate => ({
  type: LIKE_MODIFIED,
  payload: debate
});

// Push New Debate
export const pushNewDebate = debate => ({
  type: DEBATE_ADDED,
  payload: debate
});

// Push New Challenge - Withdraw
export const pushChallenge = debate => ({
  type: CHALLENGE_WITHDRAW,
  payload: debate
});

// Push New Ready
export const pushReady = debate => ({
  type: DEBATE_READY,
  payload: debate
});

// Push New Ready
export const pushLive = debate => ({
  type: DEBATE_JOINED,
  payload: debate
});

// Push New Ended Debate
export const pushEnded = debate => ({
  type: DEBATE_ENDED,
  payload: debate
});
