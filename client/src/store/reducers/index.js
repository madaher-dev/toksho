import { combineReducers } from 'redux';
import userReducer from './userReducer';
import debateReducer from './debateReducer';
import alertReducer from './alertReducer';
import profilesReducer from './profilesReducer';
import commentReducer from './commentReducer';
import { reducer as voxeetReducer } from '@voxeet/react-components';
// import matchReducer from './matchReducer';
// import navigationReducer from './navigationReducer';

export default combineReducers({
  users: userReducer,
  debates: debateReducer,
  alerts: alertReducer,
  profiles: profilesReducer,
  voxeet: voxeetReducer,
  comments: commentReducer
  // matches: matchReducer,
  // navigation: navigationReducer
});
