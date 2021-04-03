import { GET_PROFILE, PROFILE_ERROR, NO_PROFILE } from '../actions/Types';

const initialState = {
  profile: null,
  error: null,
  noProfile: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE: //Completed step 1 of registration
      return {
        ...state,
        profile: action.payload.data,
        noProfile: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        noProfile: true
      };
    case NO_PROFILE:
      return {
        ...state,
        noProfile: true
      };

    default:
      return state;
  }
};
