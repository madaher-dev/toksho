import {
  SET_SEARCH_LOADING,
  GET_SEARCH,
  SEARCH_ERROR,
  GET_TOPICS,
  GET_SEARCH_USERS
} from '../actions/Types';

const initialState = {
  debates: [],
  topics: [],
  users: [],
  error: null,
  loading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...state,
        debates: action.payload.data.debates,
        loading: false,
        error: null
      };
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload.data.topics,
        loading: false,
        error: null
      };
    case GET_SEARCH_USERS:
      return {
        ...state,
        users: action.payload.data.users,
        loading: false,
        error: null
      };

    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
