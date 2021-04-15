import { reducer as voxeetReducer } from '@voxeet/react-components';
import React from 'react';
import thunkMidleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import { ConferenceRoom, VoxeetProvider } from '@voxeet/react-components';

// Import Style
import '@voxeet/react-components/dist/voxeet-react-components.css';

const reducers = combineReducers({
  voxeet: voxeetReducer
});

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware));

const settings = {
  consumerKey: 'WZF9gs8QY4oQTcUKzZVqtQ==',
  consumerSecret: 'NpAb23wMZD2X90ERBMOFD31vTSfIhTNJ_ML4tVgCLFg=',
  conferenceAlias: 'Sample77'
};

function App() {
  return (
    <VoxeetProvider store={configureStore()}>
      <ConferenceRoom
        autoJoin
        consumerKey={settings.consumerKey}
        consumerSecret={settings.consumerSecret}
        conferenceAlias={settings.conferenceAlias}
      />
    </VoxeetProvider>
  );
}

export default App;
