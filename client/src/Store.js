import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
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

export default store;
