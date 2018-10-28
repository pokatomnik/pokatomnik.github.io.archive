import {createAction, handleActions} from 'redux-actions';

export const branch = 'error';

const initialState = {
    title: undefined,
    message: undefined
};

export const selectErrorTitle = (state) => state[branch].title;

export const selectErrorMessage = (state) => state[branch].message;

export const selectErrorExists = (state) => Boolean(
    selectErrorTitle(state) && selectErrorMessage(state)
);

const setErrorAction = createAction(`${branch}:setError`);

const removeErrorAction = createAction(`${branch}:removeError`);

export const setError = (title, message) => (dispatch) => {
    dispatch(setErrorAction({title, message}));
};

export const removeError = () => (dispatch) => {
    dispatch(removeErrorAction());
};

export const reducer = handleActions({
    [setErrorAction]: (state, {payload: {title, message}}) => ({...state, title, message}),

    [removeErrorAction]: () => initialState
}, initialState);
