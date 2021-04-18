import {
  GET_PROFILE,
  PROFILE_ERROR,
  NO_PROFILE,
  CHALLENGERS_LOADING,
  SET_PICK_LOADING,
  OPEN_CHALLENGERS_MODAL,
  CLOSE_CHALLENGERS_MODAL,
  SET_READY_LOADING,
  PICK_MODIFIED
} from './Types';
import axios from 'axios';
// const FormData = require('form-data');
const factory = require('./actionsFactory');

//Get Profile by Handler
export const getProfileByHandler = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(
      '/api/v1/users/getProfileByHandler',
      { profile },
      config
    );

    if (!response.data.data) {
      dispatch({
        type: NO_PROFILE
      });
    } else {
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.message
    });
  }
};

// Get Profile by ID

// export const getChallenger = profile =>
//   factory.get(
//     `/api/v1/users/profiles/${profile}`,
//     'GET_CHALLENGER',
//     'NO_PROFILE'
//   );

// Get Challengers Details
export const getChallengers = debate =>
  factory.get(
    `/api/v1/debates/challengers/${debate}`,
    'GET_CHALLENGERS',
    'NO_PROFILE'
  );

// Get Likers Details
export const getLikers = debate =>
  factory.get(`/api/v1/debates/likers/${debate}`, 'GET_LIKERS', 'NO_PROFILE');

// Pick

export const pick = (debate, challenger) =>
  factory.post(
    { debate, challenger },
    `/api/v1/debates/pickChallengers`,
    'PICK_MODIFIED',
    'PROFILE_ERROR'
  );

// UnPick

export const unpick = (debate, challenger) =>
  factory.post(
    { debate, challenger },
    `/api/v1/debates/unpickChallengers`,
    'PICK_MODIFIED',
    'PROFILE_ERROR'
  );

// Push New Pick - Unpick
export const pushPick = debate => ({
  type: PICK_MODIFIED,
  payload: debate
});

// Set Loading
export const setChallengersLoading = () => ({ type: CHALLENGERS_LOADING });

// Set Pick Loading
export const setPickLoading = challenger => ({
  type: SET_PICK_LOADING,
  payload: challenger
});

//Close  Challengers Modal
export const handleCloseModal = () => ({ type: CLOSE_CHALLENGERS_MODAL });

//Open  Challengers Modal
export const handleOpenModal = debate => ({
  type: OPEN_CHALLENGERS_MODAL,
  payload: debate
});

//Set ready Loading
export const setReadyLoading = () => ({ type: SET_READY_LOADING });
