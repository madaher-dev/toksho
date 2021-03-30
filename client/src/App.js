import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './Store';
import Landing from './components/auth/Landing';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerts from './components/layout/Alerts';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Login from './components/auth/Login';
import NotVerified from './pages/NotVerified';
import Forgot from './components/auth/Forgot';
import ResetPassword from './components/auth/ResetPassword';

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
      main: '#343941',
      dark: '#0e131b',
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
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
              <Alerts />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/signup/:id" component={Landing} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/welcome" component={Welcome} />
                <Route exact path="/notverified" component={NotVerified} />
                <Route exact path="/forgot" component={Forgot} />
                <Route
                  exact
                  path="/reset/:email_token"
                  component={ResetPassword}
                />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
