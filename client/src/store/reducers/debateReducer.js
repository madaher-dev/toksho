import {
  DEBATE_ADDED,
  DEBATE_ERROR,
  CLEAR_ERRORS,
  SET_DEBATE_LOADING,
  OPEN_CREATE_DEBATE,
  CLOSE_CREATE_DEBATE,
  GET_ALL_DEBATES,
  CHALLENGE_WITHDRAW,
  SET_CHALLENGE_LOADING,
  SET_LIKE_LOADING,
  LIKE_MODIFIED,
  PICK_MODIFIED,
  DEBATE_READY,
  GET_READY_DEBATES,
  GET_MY_DEBATES,
  GET_PROFILE_DEBATES,
  GET_SINGLE_DEBATE,
  LOGOUT
} from '../actions/Types';

const initialState = {
  debates: [],
  readyDebates: [],
  myDebates: [],
  userDebates: [],
  debate: null,
  error: null,
  loading: false,
  added: null,
  openModal: false,
  challengeLoading: null,
  likeLoading: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case DEBATE_ADDED:
      return {
        ...state,
        debates: [action.payload.data.debate, ...state.debates],
        loading: false,
        openModal: false,
        debate: null
      };
    //Only Challenges
    case GET_ALL_DEBATES:
      return {
        ...state,
        debates: action.payload.data.debates,
        loading: false,
        debate: null
      };
    case GET_SINGLE_DEBATE:
      return {
        ...state,
        debate: action.payload.data.data
      };
    case GET_MY_DEBATES:
      return {
        ...state,
        myDebates: action.payload.data.debates,
        loading: false,
        debate: null
      };
    case GET_PROFILE_DEBATES:
      return {
        ...state,
        userDebates: action.payload.data.debates,
        loading: false
      };
    case GET_READY_DEBATES:
      return {
        ...state,
        readyDebates: action.payload.data.debates,
        loading: false,
        debate: null
      };
    case DEBATE_READY:
      return {
        ...state,
        debates: state.debates.filter(
          debate => debate._id !== action.payload.data.debate._id
        ),
        // debates: state.debates.map(debate =>
        //   debate._id === action.payload.data.debate._id ? null : debate
        // ),
        readyDebates: [action.payload.data.debate, ...state.readyDebates],
        loading: false,
        challengeLoading: null,
        likeLoading: null,
        openModal: false
      };

    case CHALLENGE_WITHDRAW:
    case LIKE_MODIFIED:
    case PICK_MODIFIED:
      return {
        ...state,
        debates: state.debates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        readyDebates: state.readyDebates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        myDebates: state.myDebates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        userDebates: state.userDebates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        loading: false,
        challengeLoading: null,
        likeLoading: null
      };

    case DEBATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        challengeLoading: null,
        likeLoading: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SET_DEBATE_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CHALLENGE_LOADING:
      return {
        ...state,
        challengeLoading: action.payload
      };
    case SET_LIKE_LOADING:
      return {
        ...state,
        likeLoading: action.payload
      };
    case OPEN_CREATE_DEBATE:
      return {
        ...state,
        openModal: true
      };
    case CLOSE_CREATE_DEBATE:
      return {
        ...state,
        openModal: false
      };
    case LOGOUT:
      return {
        ...state,
        debates: [],
        readyDebates: [],
        myDebates: [],
        error: null,
        loading: false,
        added: null,
        openModal: false,
        challengeLoading: null,
        likeLoading: null,
        debate: null
      };
    default:
      return state;
  }
};