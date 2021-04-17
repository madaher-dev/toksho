import {
  ADD_COMMENT,
  COMMENT_ERROR,
  PUSH_COMMENTS,
  SET_COMMENT_LOADING,
  DELETE_COMMENT,
  PULL_COMMENTS
} from './Types';
import axios from 'axios';

const factory = require('./actionsFactory');

// Create New Debate
export const addComment = (debate, comment) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/v1/comments/${debate}`,
      { comment },
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response.data.message
    });
  }
};

// Get all Debate Comments

export const getComments = debate =>
  factory.get(`/api/v1/comments/${debate}`, 'GET_COMMENTS', 'COMMENT_ERROR');

// Set Push Comments received by Pusher
export const pushComments = comments => ({
  type: PUSH_COMMENTS,
  payload: comments
});

export const pullComments = comment => ({
  type: PULL_COMMENTS,
  payload: comment
});

// Delete Comment

export const deleteComment = comment => async dispatch => {
  try {
    await axios.delete(`/api/v1/comments/${comment}`);
    dispatch({ type: DELETE_COMMENT, payload: comment });
  } catch (err) {
    dispatch({ type: COMMENT_ERROR, payload: err.response.data.message });
  }
};
// Set Comment Loading
export const setLoading = () => ({
  type: SET_COMMENT_LOADING
});
