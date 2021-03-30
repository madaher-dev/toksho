import {
  CLEAR_ERRORS,
  SET_USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EMAIL_RESEND,
  AUTH_ERROR,
  EMAIL_VERIFIED,
  CODE_ERROR,
  HANDLER_ERROR,
  HANDLER_ADDED,
  USER_LOADED,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LINK_SENT,
  TOKEN_CONFIRMED,
  RESET_PASS_SUCCESSS
} from '../actions/Types';

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
  step: 1,
  emailSent: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        loading: false,
        step: 2
      };
    case HANDLER_ADDED:
      return {
        ...state,
        user: action.payload.data.user,
        isAuthenticated: true,
        loading: false,
        step: 1
      };
    case RESET_PASS_SUCCESSS: //check/test if not email confirmed
      if (
        !action.payload.data.user.verified ||
        !action.payload.data.user.handler
      ) {
        return {
          ...state,
          user: action.payload.data.user,
          loading: false,
          step: 1
        };
      } else {
        return {
          ...state,
          user: action.payload.data.user,
          isAuthenticated: true,
          loading: false,
          step: 1
        };
      }
    case LOGIN_SUCCESS: //Will Login Unconfirmed email
      return {
        ...state,
        user: action.payload.data.user,
        loading: false
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data.doc
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        user: action.payload.data.user,
        loading: false,
        step: 3
      };

    case CODE_ERROR:
      return {
        ...state,
        step: 2,
        error: action.payload
      };
    case LINK_SENT:
      return {
        ...state,
        linkSent: true,
        loading: false,
        error: action.payload.message
      };
    case TOKEN_CONFIRMED:
      return {
        ...state,
        email_token: true,
        user: action.payload.data.user,
        loading: false
      };
    case HANDLER_ERROR:
      return {
        ...state,
        step: 3,
        error: action.payload
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        step: 1
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case EMAIL_RESEND:
      return {
        ...state,
        emailSent: true,
        loading: false,
        step: 2
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,

        emailSent: false
      };
    default:
      return state;
  }
};
