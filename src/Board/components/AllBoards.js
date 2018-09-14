import React from 'react';
import PropTypes from 'prop-types';

import {history, paths,} from 'utils/routes';
import './styles.scss';
import NewBoard from './NewBoard';

class AllBoards extends React.Component {
  static propTypes = {
    boardsList: PropTypes.array,
    fetchAllBoards: PropTypes.func,
    setBoardView: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchAllBoards();
  }

  viewBoard = board => () => {
    this.props.setBoardView(board);
    history.push(paths.boardView(board.id));
  }

  render() {
    return (
      <div className='boards-container'>
        <NewBoard/>
        <div className='boards-list'>
          {this.props.boardsList.map(board => (
            <div className='board-card' key={board.id} onClick={this.viewBoard(board)}>
              {board.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AllBoards;
