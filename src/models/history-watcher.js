import { createAction, handleActions } from 'redux-actions';
import { push as reduxPush } from 'react-router-redux';

export const branch = 'historyWatcher';

const initialState = {
    history: [undefined, undefined]
};

const selectPathName = ({
    router: {
        location: {pathname: pathName}
    }
}) => pathName;

// This action creator is required to forbid pushing the same route into the state.
export const push = (to) => (dispatch, getState) => {
    const pathName = selectPathName(getState());
    if (pathName !== to) {
        dispatch(reduxPush(to));
    }
};

export const selectGoBackPath = (state) => state[branch].history[0];

export const addHistoryAction = createAction(`${branch}:addHistory`);

const addLast = (arr, newPath) => [arr[arr.length - 1], newPath];

export const reducer = handleActions({
    [addHistoryAction]: (state, {payload: newPath}) => ({
        ...state,
        history: addLast(state.history, newPath)
    })
}, initialState);
