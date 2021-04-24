import {
  DEBATE_ADDED,
  DEBATE_ERROR,
  CLEAR_ERRORS,
  SET_DEBATE_LOADING,
  OPEN_CREATE_DEBATE,
  CLOSE_CREATE_DEBATE,
  GET_NEW_DEBATES,
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
  GET_LIVE_DEBATES,
  DEBATE_JOINED,
  SET_ENDED,
  DEBATE_ENDED,
  LOGOUT
} from '../actions/Types';

const initialState = {
  debates: [],
  readyDebates: [],
  myDebates: [],
  userDebates: [],
  liveDebates: [],
  endedDebates: [],
  debate: null,
  error: null,
  loading: false,
  added: null,
  openModal: false,
  challengeLoading: null,
  likeLoading: null,
  joined: null //Will hold ID of joined debate
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  function upsert(array, item) {
    // (1)
    // make a copy of the existing array
    let newArray = array.slice();

    const i = newArray.findIndex(_item => _item._id === item._id);
    if (i > -1) {
      newArray[i] = item;
      return newArray;
    }
    // (2)
    else {
      newArray.unshift(item);
      return newArray;
    }
  }
  switch (action.type) {
    case DEBATE_ADDED:
      return {
        ...state,
        debates: upsert(state.debates, action.payload.data.debate),
        myDebates: upsert(state.myDebates, action.payload.data.debate),
        loading: false,
        openModal: false,
        debate: null
      };
    //Only Challenges
    case GET_NEW_DEBATES:
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
    case GET_LIVE_DEBATES:
      return {
        ...state,
        liveDebates: action.payload.data.debates,
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
        readyDebates: upsert(state.readyDebates, action.payload.data.debate),
        debate:
          state.debate?._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : state.debate,
        loading: false,
        challengeLoading: null,
        likeLoading: null,
        openModal: false
      };
    case DEBATE_JOINED:
      return {
        ...state,
        readyDebates: state.readyDebates.filter(
          debate => debate._id !== action.payload.data.debate._id
        ),
        // Add to list only if item does not exist
        liveDebates: upsert(state.liveDebates, action.payload.data.debate),
        myDebates: state.myDebates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        debate:
          state.debate?._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : state.debate,
        loading: false,
        challengeLoading: null,
        likeLoading: null,
        openModal: false,
        joined: action.payload.data.debate._id
      };
    case DEBATE_ENDED:
      return {
        ...state,
        readyDebates: state.readyDebates.filter(
          debate => debate._id !== action.payload.data.debate._id
        ),
        liveDebates: state.readyDebates.filter(
          debate => debate._id !== action.payload.data.debate._id
        ),
        // Add to list only if item does not exist
        endedDebates: upsert(state.liveDebates, action.payload.data.debate),
        myDebates: state.myDebates.map(debate =>
          debate._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : debate
        ),
        debate:
          state.debate?._id === action.payload.data.debate._id
            ? action.payload.data.debate
            : state.debate,
        loading: false,
        challengeLoading: null,
        likeLoading: null,
        openModal: false,
        joined: null
      };
    case SET_ENDED:
      return {
        joined: null
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
        liveDebates: state.liveDebates.map(debate =>
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
        debate:
          state.debate?._id === action.payload?.data.debate._id
            ? action.payload?.data.debate
            : state.debate,
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
        debate: null,
        joined: null
      };
    default:
      return state;
  }
};
