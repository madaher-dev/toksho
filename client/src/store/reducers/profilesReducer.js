import {
  GET_PROFILE,
  PROFILE_ERROR,
  NO_PROFILE,
  GET_CHALLENGERS,
  CHALLENGERS_LOADING,
  PICK_MODIFIED,
  SET_PICK_LOADING,
  OPEN_CHALLENGERS_MODAL,
  CLOSE_CHALLENGERS_MODAL,
  DEBATE_READY,
  SET_READY_LOADING,
  LOGOUT
} from '../actions/Types';

const initialState = {
  profile: null,
  error: null,
  noProfile: false,
  challengers: [],
  loading: false,
  pickLoading: null,
  challengersModal: false,
  readyLoading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE: //Completed step 1 of registration
      return {
        ...state,
        profile: action.payload.data,
        noProfile: false,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        noProfile: true,
        loading: false
      };
    case NO_PROFILE:
      return {
        ...state,
        noProfile: true,
        loading: false
      };
    case GET_CHALLENGERS:
      return {
        ...state,
        challengers: action.payload.data,
        noProfile: false,
        loading: false
      };
    case PICK_MODIFIED:
      return {
        ...state,
        // guests: action.payload.data.debate.guests,
        loading: false,
        pickLoading: null
      };
    case CHALLENGERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_PICK_LOADING:
      return {
        ...state,
        pickLoading: action.payload
      };
    case OPEN_CHALLENGERS_MODAL:
      return {
        ...state,
        challengersModal: true
      };
    case CLOSE_CHALLENGERS_MODAL:
    case DEBATE_READY:
      return {
        ...state,
        challengersModal: false,
        readyLoading: false
      };
    case SET_READY_LOADING:
      return {
        ...state,
        readyLoading: true
      };
    case LOGOUT:
      return {
        ...state,
        profile: null,
        error: null,
        noProfile: false,
        challengers: [],
        loading: false,
        pickLoading: null,
        challengersModal: false,
        readyLoading: false
      };
    default:
      return state;
  }
};
