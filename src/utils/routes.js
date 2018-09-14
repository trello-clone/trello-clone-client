import createHistory from 'history/createBrowserHistory';
import AllBoardsContainer from 'Board/containers/AllBoards.container';
import BoardView from 'Board/containers/BoardView.container';

export const history = createHistory();

export const paths = {
  allBoard: '/board',
  boardView: board_id => `/board/${board_id}`,
};

const routes = [
  {
    path: paths.allBoard,
    exact: true,
    component: AllBoardsContainer,
  },
  {
    path: paths.boardView(':board_id'),
    component: BoardView,
  },
];

export default routes;
