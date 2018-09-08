import createActions from 'utils/createActions';
import {actions,} from './constants';
import {apiRequest,} from 'utils/apiActions';
import {API_URL,} from 'utils/constants';

export const fetchAllBoards = () => apiRequest({
  url: API_URL,
  onSuccess: (response) => ({
    type: actions.FETCH_ALL_BOARDS_SUCCESS,
    payload: response,
  }),
  onFailure: console.log('Error fetching boards'),
  actionName: actions.FETCH_ALL_BOARDS,
});

export const updateBoards = (data) => apiRequest({
  url: API_URL,
  method: 'PUT',
  data,
  onSuccess: (response) => ({
    type: actions.UPDATE_BOARDS_SUCCESS,
    payload: response,
  }),
  onFailure: console.log('Error updating boards'),
  actionName: actions.UPDATE_BOARDS,
});

export default {...createActions(actions),};
