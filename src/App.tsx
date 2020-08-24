import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { AnimatedSwitch } from 'react-router-transition';
import Routes from './constants/routes';

import './App.css';

import LandingPage from './components/landingPage';
import DisqualifiedPage from './components/disqualifiedPage';
import CreateAccountPage from './components/createAccountPage';
import { PrivateRoute } from './components/privateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className='switch-wrapper'
        >
          <PrivateRoute exact path={Routes.LANDING} component={LandingPage} />
          <PrivateRoute exact path={Routes.CREATE_ACCOUNT} component={CreateAccountPage} />
          <Route exact path={Routes.DISQUALIFIED}>
            <DisqualifiedPage />
          </Route>
        </AnimatedSwitch>
      </Router>
    </div>
  );
}

export default App;
