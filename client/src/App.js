import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './Store';
import Landing from './components/auth/Landing';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PrivateRoute from './components/routing/PrivateRoute';
import DebateRoute from './components/routing/DebateRoute';
import Alerts from './components/layout/Alerts';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Login from './components/auth/Login';
import NotVerified from './pages/NotVerified';
import Forgot from './components/auth/Forgot';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './pages/Profile';
import HelmetMeta from './HelmetMeta';
import { HelmetProvider } from 'react-helmet-async';
import Voxeet from './pages/Voxeet';
import { VoxeetProvider } from '@voxeet/react-components';
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
  const helmetContext = {};

  return (
    <div className="App">
      <HelmetProvider context={helmetContext}>
        <VoxeetProvider store={store}>
          <Provider store={store}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Router>
                  <Alerts />
                  <HelmetMeta />
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/voxeet" component={Voxeet} />
                    <Route path="/signup/:id" component={Landing} />
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
      </HelmetProvider>
    </div>
  );
}

export default App;
