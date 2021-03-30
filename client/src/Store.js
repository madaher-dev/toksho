import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
//import setAuthToken from './utils/setauthtoken';
//import * as actionCreators from './actions/userActions';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  // actionCreators,
  trace: false,
  traceLimit: 25
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
// let currentState = store.getState();

// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   // let previousState = currentState;
//   // currentState = store.getState();
//   // if the token changes set the value in localStorage and axios headers
//   // if (previousState.users.token !== currentState.users.token) {
//   //   const token = currentState.users.token;
//   //   setAuthToken(token);
//   // }
// });
export default store;
