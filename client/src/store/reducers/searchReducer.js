import {
  SET_SEARCH_LOADING,
  GET_SEARCH,
  GET_SEARCH_ERROR
} from '../actions/Types';

const initialState = {
  debates: [],
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

    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
