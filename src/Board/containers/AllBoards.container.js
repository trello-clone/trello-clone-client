import {connect,} from 'react-redux';

import boardActions, {fetchAllBoards,} from '../actions';
import AllBoards from 'Board/components/AllBoards';

const mapStateToProps = state => ({
  boardsList: state.boardReducer.boardsList,
});

export default connect(mapStateToProps, {
  fetchAllBoards,
  setBoardView: boardActions.setBoardView,
})(AllBoards);
