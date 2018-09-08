import React from 'react';

import './styles.scss';
import NewBoard from './NewBoard';

class Board extends React.Component {
  render() {
    return (
      <div className='board-container'>
        <NewBoard/>
      </div>
    );
  }
}

export default Board;
