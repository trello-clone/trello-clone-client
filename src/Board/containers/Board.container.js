import React from 'react';
import {connect,} from 'react-redux';

import Board from '../components/Board';

const mapStateToProps = state => ({
  boardsList: state.boardReducer.boardsList,
});

export default connect(mapStateToProps, null)(Board);
