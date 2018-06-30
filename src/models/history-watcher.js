import { createAction, handleActions } from 'redux-actions';

export const branch = 'historyWatcher';

const initialState = {
    history: [undefined, undefined]
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
