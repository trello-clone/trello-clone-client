import createActions from 'utils/createActions';
import {actionLabels,} from './constants';
import {apiRequest,} from 'utils/apiActions';
import {API_URL,} from 'utils/constants';

export const fetchAllBoards = () => apiRequest({
  url: API_URL,
  onSuccess: (response) => ({
    type: actionLabels.FETCH_ALL_BOARDS_SUCCESS,
    payload: response,
  }),
  onFailure: error => {console.log('Error fetching boards', error);},
  actionName: actionLabels.ASYNC_FETCH_ALL_BOARDS,
});

export const updateBoards = (data) => apiRequest({
  url: API_URL,
  method: 'PUT',
  data,
  onSuccess: (response) => ({
    type: actionLabels.UPDATE_BOARDS_SUCCESS,
    payload: response,
  }),
  onFailure: console.log('Error updating boards'),
  actionName: actionLabels.ASYNC_UPDATE_BOARDS,
});

export default {...createActions(actionLabels),};
