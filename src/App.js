import React, { Component, } from 'react';
import {Switch, withRouter, Route, Redirect,} from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import routes, {paths,} from 'utils/routes';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div id='header'>
          <h2 className='app-heading'>A plain and simple copy of Trello</h2>
          <p>* When you're done typing any thing, just press <b>Enter</b> to confirm your input.</p>
        </div>
        <Switch>
          {routes.map((route, index) => <Route exact={route.exact} path={route.path} component={route.component} key={index} />)}
          <Redirect to={paths.allBoard} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
