import { combineReducers } from 'redux';
import userReducer from './userReducer';
import debateReducer from './debateReducer';
import alertReducer from './alertReducer';
import profilesReducer from './profilesReducer';
// import matchReducer from './matchReducer';
// import navigationReducer from './navigationReducer';

export default combineReducers({
  users: userReducer,
  debates: debateReducer,
  alerts: alertReducer,
  profiles: profilesReducer
  // matches: matchReducer,
  // navigation: navigationReducer
});
