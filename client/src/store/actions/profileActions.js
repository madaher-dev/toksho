import { GET_PROFILE, PROFILE_ERROR, NO_PROFILE } from './Types';
import axios from 'axios';
// const FormData = require('form-data');
const factory = require('./actionsFactory');

//Similar to loadUser but does not return error on fail
export const getProfile = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(
      '/api/v1/users/getProfile',
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
