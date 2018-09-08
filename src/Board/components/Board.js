import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import NewBoard from './NewBoard';

class Board extends React.Component {
  static propTypes = {
    boardsList: PropTypes.array,
    fetchAllBoards: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchAllBoards();
  }

  render() {
    return (
      <div className='board-container'>
        <NewBoard/>
        <div className='boards-list'>
          {this.props.boardsList.map(board => (
            <div className='board-card' key={board.id}>
              {board.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
