import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import crushReducer from './crushReducer';
import alertReducer from './alertReducer';
// import matchReducer from './matchReducer';
// import navigationReducer from './navigationReducer';

export default combineReducers({
  users: userReducer,
  // crushes: crushReducer,
  alerts: alertReducer
  // matches: matchReducer,
  // navigation: navigationReducer
});
