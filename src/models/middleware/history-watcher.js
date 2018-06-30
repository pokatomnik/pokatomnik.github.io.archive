import { LOCATION_CHANGE } from 'react-router-redux';
import { addHistoryAction } from '../history-watcher';

export default () => (store) => (next) => (action) => {
    if (action.type === LOCATION_CHANGE) {
        const {payload: {pathname: pathName}} = action;
        store.dispatch(addHistoryAction(pathName));
    }
    return next(action);
};