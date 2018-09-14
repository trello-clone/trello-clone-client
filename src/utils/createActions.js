import { createAction, } from 'redux-actions';
import camelCase from 'lodash/camelCase';

const createActions = (actions) => {
  const exportFunc = {};
  for (let index in actions) {
    if (actions.hasOwnProperty(index) && typeof (actions[index]) === 'string' && !actions[index].startsWith('ASYNC_')) {
      exportFunc[camelCase(index)] = createAction(actions[index]);
    }
  }
  return exportFunc;
};
export default createActions;
