import { handleActions, } from 'redux-actions';

const defaultBoardState = {
  boardsList: [],
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
}, defaultBoardState);

export default boardReducer;
