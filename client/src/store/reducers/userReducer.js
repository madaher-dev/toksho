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
  RESET_PASS_SUCCESSS,
  AVATAR_UPLOADED,
  AVATAR_FAIL,
  BIO_FAIL,
  UPDATE_BIO,
  SET_PUSHER,
  INFO_UPDATED,
  PASSWORD_UPDATED,
  SET_SETTINGS_LOADING,
  PASSWORD_ERROR
} from '../actions/Types';

const initialState = {
  isAuthenticated: null,
  loading: true, //Initialize to true to avoid redirect to landing while checking user
  settingsLoading: false,
  user: null,
  error: null,
  step: 1, //Step is used for signup Modal - Step 1 for email/pass/dob - Step 2 for Email Validation - Step 3 for set handler
  avatarStep: 1, // Step for the avatar page
  emailSent: false, //Validation Email Sent
  pusher: null,
  passwordUpdated: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: //Completed step 1 of registration
      return {
        ...state,
        user: action.payload.data.user,
        loading: false,
        step: 2
      };
    case HANDLER_ADDED: //Completed step 3 of registration
      return {
        ...state,
        user: action.payload.data.user,
        isAuthenticated: true,
        loading: false,
        step: 1
      };
    case PASSWORD_UPDATED:
      return {
        ...state,
        user: action.payload.data.user,
        isAuthenticated: true,
        settingsLoading: false,
        passwordUpdated: true
      };

    case RESET_PASS_SUCCESSS: //checks if email verified and handler set (step 2 and 3)
      if (
        !action.payload.data.user.verified ||
        !action.payload.data.user.handler
      ) {
        return {
          // redirects to notverified
          ...state,
          user: action.payload.data.user,
          loading: false,

          step: 1
        };
      } else {
        // redirects to home
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
    case SET_PUSHER:
      return {
        ...state,
        pusher: action.payload
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        setSettingsLoading: false,
        user: null,
        error: action.payload,
        avatarStep: 1,
        step: 1,
        emailSent: false
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data.data
      };
    case INFO_UPDATED:
      return {
        ...state,
        settingsLoading: false,
        isAuthenticated: true,
        user: action.payload.data.user
      };
    case AVATAR_UPLOADED:
      return {
        ...state,
        avatarStep: 2,
        loading: false,
        setSettingsLoading: false,
        isAuthenticated: true,
        user: action.payload.data.user
      };
    case UPDATE_BIO:
      return {
        ...state,
        avatarStep: 3,
        loading: false,
        isAuthenticated: true,
        user: action.payload.data.user
      };
    case BIO_FAIL:
      return {
        ...state,
        avatarStep: 2,
        loading: false,
        error: action.payload
      };
    case AVATAR_FAIL:
      return {
        ...state,
        avatarStep: 1,
        loading: false,
        error: action.payload
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        user: action.payload.data.user,
        loading: false,
        step: 3
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        settingsLoading: false,
        passwordUpdated: false
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
        loading: false,
        settingsLoading: false,
        passwordUpdated: false
      };
    case SET_SETTINGS_LOADING:
      return {
        ...state,
        settingsLoading: true
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
