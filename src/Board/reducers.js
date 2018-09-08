import { handleActions, } from 'redux-actions';

const defaultBoardState = {
  boardsList: [],
};

const boardReducer = handleActions({
  ADD_NEW_BOARD: (state, action) => ({
    ...state,
    boardsList: state.boardsList.concat(action.payload),
  }),
}, defaultBoardState);

export default boardReducer;
