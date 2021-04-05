import { openModal } from '../actions/debateActions';
import {
  DEBATE_ADDED,
  DEBATE_ERROR,
  CLEAR_ERRORS,
  SET_DEBATE_LOADING,
  OPEN_CREATE_DEBATE,
  CLOSE_CREATE_DEBATE,
  GET_ALL_DEBATES
} from '../actions/Types';

const initialState = {
  debates: [{}],
  error: null,
  loading: false,
  added: null,
  openModal: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case DEBATE_ADDED:
      return {
        ...state,
        debates: [action.payload.data.debate, ...state.debates],
        loading: false,
        openModal: false
      };
    case GET_ALL_DEBATES:
      return {
        ...state,
        debates: action.payload.data.debates,
        loading: false
      };
    case DEBATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
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
    default:
      return state;
  }
};
