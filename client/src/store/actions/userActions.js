import {
  CLEAR_ERRORS,
  SET_USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  HANDLER_ADDED
} from './Types';
import axios from 'axios';
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
    console.log(res);
    if (res.data.token && res.data.data.user.handler) {
      dispatch({
        type: HANDLER_ADDED,
        payload: res.data //Token
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data //Token
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
