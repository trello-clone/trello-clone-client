import React from 'react';
import {connect,} from 'react-redux';

import boardActions, {fetchAllBoards,} from 'Board/actions';
import Column from '../components/Column';

class ColumnContainer extends React.Component {
  render() {
    const { data, } = this.props;
    return <Column data={data} />;
  }
}

const mapStateToProps = state => ({
  boardsList: state.boardReducer.boardsList,
});

export default connect(mapStateToProps, {
  fetchAllBoards,
  setBoardView: boardActions.setBoardView,
})(ColumnContainer);
