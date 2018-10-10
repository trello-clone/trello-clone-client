import React from 'react';
import PropTypes from 'prop-types';
import {connect,} from 'react-redux';

import {updateBoards,} from 'Board/actions';
import Input from 'common/Input/index';
import boardActions from 'Board/actions';

import './styles.scss';

class AddColumn extends React.Component {
  static propTypes = {
    boardView: PropTypes.object,
    updateBoards: PropTypes.func,
    setBoardView: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      newColName: '',
      newColumn: null,
    };
  }

  componentDidMount() {
    document.addEventListener('click', event => {
      if (this.element && !this.element.contains(event.target) && this.state.isActive) {
        this.setState({ isActive: false, });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newColumn && this.props.boardView.columns.find(item => item.id === this.state.newColumn.id)) {
      this.setState({ newColumn: null, newColName: '', isActive: false, });
    }
  }

  handleColNameChange = event => {
    this.setState({newColName: event.target.value,});
  }

  submit = event => {
    if (event.key === 'Enter' && this.state.newColName.length) {
      this.setState({ newColumn: {
        id: `column-${Math.random().toString(36).substring(2, 10)}`,
        name: this.state.newColName,
        tasks: [],
      }, }, () => {
        let updatedBoard = { ...this.props.boardView, };
        if (updatedBoard.columns) {
          updatedBoard.columns.push(this.state.newColumn);
        } else {
          updatedBoard['columns'] = [this.state.newColumn,];
        }
        const newBoardsList = this.props.boardsList.map(board => {
          if (board.id === this.props.boardView.id) {
            return updatedBoard;
          }
          return board;
        });
        this.props.updateBoards({ boardsList: newBoardsList, });
        this.props.setBoardView(updatedBoard);
      });
    }
  }

  render() {
    const { isActive, } = this.state;
    return (
      <div className={`add-column${isActive ? ' active' : ''}`} ref={ref => {this.element = ref;}}>
        {isActive
          ? <div>
            <Input type='text' placeholder='New column name...' autoFocus value={this.state.newColName} onChange={this.handleColNameChange} onKeyUp={this.submit} />
          </div>
          : <div onClick={() => {this.setState({isActive: true,});}}>
            Add new column...
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  boardsList: state.boardReducer.boardsList,
  boardView: state.boardReducer.boardView,
}), {
  updateBoards,
  setBoardView: boardActions.setBoardView,
})(AddColumn);
