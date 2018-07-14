import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';
import { actions as toastrActions } from 'react-redux-toastr';
import { developerEmail } from '../constants';

import { setError } from './error';

export const branch = 'pastas';

const initialState = {
    lastPastas: [],
    currentPasta: null
};

export const selectCurrentPasta = (state) => state[branch].currentPasta;

export const selectLastPastas = (state) => state[branch].lastPastas;

const appendPastasAction = createAction(`${branch}:appendPastas`);

const setCurrentPastaAction = createAction(`${branch}:setCurrentPasta`);

export const setCurrentPasta = (pasta) => (dispatch) => {
    dispatch(setCurrentPastaAction(pasta));
};

export const removeCurrentPasta = () => (dispatch, getState) => {
    setCurrentPasta(null)(dispatch, getState);
};


// This action creator does not have a reducer, so It is not change the store
export const createPasta = (name, text, encrypted, key) => (dispatch, getState) => {
    const goodName = name ? name : 'Unnamed';
    Backendless.Data
        .of('Pastas')
        .save({
            name: goodName,
            text,
            encrypted
        })
        .then(({
            name: title,
            text: message,
        }) => {
            dispatch(toastrActions.add({
                type: 'light',
                title,
                message,
                options: {
                    showCloseButton: true, // true by default
                }
            }));
        })
        .catch(() => {
            setError(
                'Server error',
                `Please try again later or report ${developerEmail}`
            )(dispatch, getState);
        });
};

export const reducer = handleActions({
    [appendPastasAction]: (state, {payload: newPastas}) => ({
        ...state,
        lastPastas: [
            ...state.lastPastas,
            ...newPastas
        ]
    }),

    [setCurrentPastaAction]: (state, {payload: currentPasta}) => ({
        ...state,
        currentPasta
    })
}, initialState);
