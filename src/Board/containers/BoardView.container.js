import {connect,} from 'react-redux';

import boardActions, {fetchAllBoards,} from '../actions';
import BoardView from 'Board/components/BoardView';

const mapStateToProps = state => ({
  boardsList: state.boardReducer.boardsList,
  boardView: state.boardReducer.boardView,
});

export default connect(mapStateToProps, {
  fetchAllBoards,
  setBoardView: boardActions.setBoardView,
})(BoardView);
