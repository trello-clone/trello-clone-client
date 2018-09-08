import React, { Component, } from 'react';
// import logo from './logo.svg';
import './App.scss';
import BoardContainer from 'Board/containers/Board.container';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h2 className='app-heading'>A plain and simple copy of Trello</h2>
        <p>* When you're done typing any thing, just press <b>Enter</b> to confirm your input.</p>
        <BoardContainer/>
      </div>
    );
  }
}

export default App;
