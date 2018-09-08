import React from 'react';
import PropTypes from 'prop-types';
import {connect,} from 'react-redux';

import {updateBoards,} from '../actions';
import {bindActionCreators,} from 'redux';

class NewBoard extends React.Component {
  static propTypes = {
    updateBoards: PropTypes.func,
    boardsList: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      newBoardName: '',
      newBoard: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.newBoard && this.props.boardsList.find(item => item.id === this.state.newBoard.id)) {
      this.setState({newBoard: null, newBoardName: '',});
    }
  }

  onNameChange = event => {
    this.setState({newBoardName: event.target.value,});
  }

  submit = event => {
    if (event.key === 'Enter' && this.state.newBoardName.length) {
      this.setState({newBoard: {
        id: Math.random().toString(36).substring(2, 10),
        name: this.state.newBoardName,
      },}, () => {
        this.props.updateBoards({boardsList: this.props.boardsList.concat(this.state.newBoard),});
      });
    }
  }

  render() {
    return (
      <div className='board-card' onClick={() => {this.setState({isActive: true,});}}>
        <div className='board-title'>Create a new board</div>
        {this.state.isActive &&
          <div className='new-board-info'>
            <label>Let's think of a name</label>
            <input type='text' placeholder='New board name' value={this.state.newBoardName} onChange={this.onNameChange} onKeyUp={this.submit} />
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  boardsList: state.boardReducer.boardsList,
}), {
  updateBoards,
})(NewBoard);
