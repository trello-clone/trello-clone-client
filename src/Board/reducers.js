import { handleActions, } from 'redux-actions';

const defaultBoardState = {
  boardsList: [],
  boardView: null,
};

const boardReducer = handleActions({
  FETCH_ALL_BOARDS_SUCCESS: (state, action) => ({
    ...state,
    boardsList: action.payload.boardsList,
  }),
  UPDATE_BOARDS_SUCCESS: (state, action) => ({
    ...state,
    boardsList: action.payload.boardsList,
  }),
  SET_BOARD_VIEW: (state, action) => ({
    ...state,
    boardView: action.payload,
  }),
}, defaultBoardState);

export default boardReducer;
