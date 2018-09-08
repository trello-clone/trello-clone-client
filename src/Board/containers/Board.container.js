import React from 'react';
import {connect,} from 'react-redux';

import {fetchAllBoards,} from '../actions';
import Board from '../components/Board';

const mapStateToProps = state => ({
  boardsList: state.boardReducer.boardsList,
});

export default connect(mapStateToProps, {fetchAllBoards,})(Board);
