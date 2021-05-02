import {
  GET_COMMENTS,
  ADD_COMMENT,
  COMMENT_ERROR,
  SET_COMMENT_LOADING,
  PUSH_COMMENTS,
  DELETE_COMMENT,
  PULL_COMMENTS
} from '../actions/Types';

const initialState = {
  comments: [],
  error: null,
  loading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  function upsert(array, item) {
    // (1)
    // make a copy of the existing array
    let comments = array.slice();
    const i = comments.findIndex(_item => _item._id === item._id);
    if (i > -1) {
      comments[i] = item;

      return comments;
    }
    // (2)
    else {
      // make a copy of the existing array
      let comments = array.slice();
      comments.unshift(item);

      return comments;
    }
  }

  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload.data.comments,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: upsert(state.comments, action.payload.data.comment),
        loading: false
      };
    case PUSH_COMMENTS:
      return {
        ...state,
        comments: upsert(state.comments, action.payload),
        loading: false
      };
    case DELETE_COMMENT:
    case PULL_COMMENTS:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        )
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_COMMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
