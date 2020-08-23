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
          <Route exact path={Routes.LANDING}>
            <LandingPage />
          </Route>
          <Route exact path={Routes.DISQUALIFIED}>
            <DisqualifiedPage />
          </Route>
        </AnimatedSwitch>
      </Router>
    </div>
  );
}

export default App;
