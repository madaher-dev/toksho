import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { VoxeetProvider } from '@voxeet/react-components';

import store from './Store';
import PrivateRoute from './components/routing/PrivateRoute';
import DebateRoute from './components/routing/DebateRoute';
import HelmetMeta from './meta/AppMeta';

import Landing from './pages/Home/Landing';
import Alerts from './components/layout/Alerts';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Login from './pages/Home/Login';
import NotVerified from './components/auth/NotVerified';
import Forgot from './pages/Home/Forgot';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './pages/Profile/Profile';

import './assets/scss/material-kit-react.scss?v=1.9.0';
import '@voxeet/react-components/dist/voxeet-react-components.css';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#db7987',
      main: '#A74A5A',
      dark: '#741b31',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#5e636c',
      main: '#999999',
      dark: '#343941',
      contrastText: '#000000'
    },
    white: {
      main: '#ffffff'
    }
  }
});

function App() {
  return (
    <div className="App">
      <VoxeetProvider store={store}>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Router>
                <Alerts />
                <HelmetMeta />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/signup/:open" component={Landing} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute
                    exact
                    path="/home"
                    component={Welcome}
                    page="home"
                  />
                  <PrivateRoute
                    exact
                    path="/mydebates"
                    component={Welcome}
                    page="mydebates"
                  />
                  <DebateRoute
                    exact
                    path="/debates/:debate"
                    component={Welcome}
                    page="debate"
                  />
                  <Route exact path="/notverified" component={NotVerified} />
                  <Route exact path="/forgot" component={Forgot} />
                  <Route
                    exact
                    path="/reset/:email_token"
                    component={ResetPassword}
                  />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/404" component={NotFound} />
                  <Route exact path="/:handler" component={Profile} />

                  <Route component={NotFound} />
                </Switch>
              </Router>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </Provider>
      </VoxeetProvider>
    </div>
  );
}

export default App;
