import {
  CLEAR_ERRORS,
  SET_USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  HANDLER_ADDED,
  AVATAR_UPLOADED,
  AVATAR_FAIL
} from './Types';
import axios from 'axios';
// const FormData = require('form-data');
const factory = require('./actionsFactory');
// Register User

export const registerUser = user =>
  factory.post(
    user,
    '/api/v1/users/signup',
    'REGISTER_SUCCESS',
    'REGISTER_FAIL'
  );
//Similar to loadUser but does not return error on fail
export const checkUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/v1/users/me');

    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const resendEmail = email =>
  factory.post(
    { email },
    '/api/v1/users/resendEmail',
    'EMAIL_RESEND',
    'AUTH_ERROR'
  );

// Upload Avatar
export const uploadAvatar = image => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  const form = new FormData();
  form.append('photo', image);
  try {
    const res = await axios.patch('/api/v1/users/uploadAvatar', form, config);

    dispatch({
      type: AVATAR_UPLOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AVATAR_FAIL,
      payload: err.response.data.message
    });
  }
};

// Update Bio
export const updateBio = bio =>
  factory.patch(
    { bio, firstLogin: false },
    `/api/v1/users/updateBio`,
    'UPDATE_BIO',
    'BIO_FAIL'
  );

// Verify Email with code

export const verifyEmail = code =>
  factory.post(
    { code },
    '/api/v1/users/confirmEmail',
    'EMAIL_VERIFIED',
    'CODE_ERROR'
  );

// Forget Password

export const forgotPass = email =>
  factory.post(
    email,
    '/api/v1/users/forgotPassword',
    'LINK_SENT',
    'AUTH_ERROR'
  );
// Check email token before reset password

export const checkToken = email_token =>
  factory.get(
    `/api/v1/users/checkResetToken/${email_token}`,
    'TOKEN_CONFIRMED',
    'AUTH_ERROR'
  );

// Reset Password

export const resetPass = (newPass, email_token) =>
  factory.patch(
    newPass,
    `/api/v1/users/resetPassword/${email_token}`,
    'RESET_PASS_SUCCESSS',
    'AUTH_ERROR'
  );
// Set Unique Handler
export const setHandler = values =>
  factory.post(
    values,
    '/api/v1/users/setHandler',
    'HANDLER_ADDED',
    'HANDLER_ERROR'
  );
// Logout

export const logout = () => async dispatch => {
  try {
    await axios.get('/api/v1/users/deleteCookie');
    dispatch({
      type: LOGOUT
    });
  } catch (err) {
    console.log(err);
  }
};

// Login User

export const loginUser = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/v1/users/login', user, config);

    if (res.data.token && res.data.data.user.handler) {
      dispatch({
        type: HANDLER_ADDED,
        payload: res.data //User
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data //User
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message
    });
    dispatch(logout());
  }
};
// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_USER_LOADING });
