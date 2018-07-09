import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';

export const branch = 'pastas';

const initialState = {
    lastPastas: []
};

export const selectLastPastas = (state) => state[branch].lastPastas;

const appendPastaAction = createAction(`${branch}: appendPasta`);

export const createPasta = (name, text, encrypted, key) => (dispatch) => {
    const goodName = name ? name : 'Unnamed';
    Backendless.Data
        .of('Pastas')
        .save({
            name: goodName,
            text,
            encrypted
        })
        .then(({name, text}) => {
            dispatch(appendPastaAction({name, text: encrypted ? undefined : text}));
        })
        .catch(console.error);
};

export const reducer = handleActions({
    [appendPastaAction]: (state, {payload: newPasta}) => ({...state, lastPastas: [...state.lastPastas, newPasta]})
}, initialState);
