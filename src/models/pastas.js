import { createAction, handleActions } from 'redux-actions';
import Backendless from 'backendless';
import { actions as toastrActions } from 'react-redux-toastr';
import { developerEmail } from '../constants';

import { setError } from './error';
import ToastrLink from '../components/common/toastr-link/toastr-link';

export const branch = 'pastas';

const initialState = {
    lastPastas: [],
    currentPasta: null,
    isLoadingPasta: false,
    isLoadingPastaList: false,
    isSavingPasta: false,
    /* Only for last created pasta */
    lastCreatedObjectId: undefined,
    lastCreatedName: undefined
};

/* selectors */
export const selectLastCreatedObjectId = (state) => state[branch].lastCreatedObjectId;

export const selectLastCreatedName = (state) => state[branch].lastCreatedName;

export const selectIsSavingPasta = (state) => state[branch].isSavingPasta;

export const selectIsLoadingPasta = (state) => state[branch].isLoadingPasta;

export const selectIsLoadingPastaList = (state) => state[branch].isLoadingPastaList;

export const selectCurrentPasta = (state) => state[branch].currentPasta;

export const selectLastPastas = (state) => state[branch].lastPastas;

/* action creators */
const setLastCreatePastaAction = createAction(`${branch}:setLastCreatedPasta`);

const setIsSavingPastaAction = createAction(`${branch}:setIsSavingPasta`);

const setIsLoadingPastaAction = createAction(`${branch}:setIsLoadingPasta`);

const setIsLoadingPastaListAction = createAction(`${branch}:setIsLoadingPastaList`);

const appendPastasAction = createAction(`${branch}:appendPastas`);

const setCurrentPastaAction = createAction(`${branch}:setCurrentPasta`);

/* async action creators */
const setLastCreatedPasta = (lastCreatedObjectId, lastCreatedName) => (dispatch) => {
    dispatch(setLastCreatePastaAction({lastCreatedObjectId, lastCreatedName}));
};

export const removeLastCreatedPasta = () => (dispatch, getState) => {
    setLastCreatedPasta(undefined, undefined)(dispatch, getState);
};

export const setCurrentPasta = (pasta) => (dispatch) => {
    dispatch(setCurrentPastaAction(pasta));
};

export const removeCurrentPasta = () => (dispatch, getState) => {
    setCurrentPasta(null)(dispatch, getState);
};

// This action creator does not have a reducer, so It is not change the store
export const createPasta = (name, text, encrypted, key) => (dispatch, getState) => {
    dispatch(setIsSavingPastaAction(true));
    const goodName = name ? name : 'Unnamed';
    Backendless.Data
        .of('Pastas')
        .save({
            name: goodName,
            text,
            encrypted
        })
        .then(({
            name,
            objectId,
        }) => {
            dispatch(setIsSavingPastaAction(false));
            setLastCreatedPasta(objectId, name)(dispatch, getState);
            dispatch(toastrActions.add({
                type: 'light',
                title: 'A new Pasta has been created',
                options: {
                    component: ToastrLink,
                    onHideComplete: () => {
                        removeLastCreatedPasta()(dispatch, getState);
                    },
                    showCloseButton: true, // true by default
                }
            }));
        })
        .catch(() => {
            dispatch(setIsSavingPastaAction(false));
            setError(
                'Server error',
                `Please try again later or report ${developerEmail}`
            )(dispatch, getState);
        });
};

/* reducers */
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
    }),

    [setIsLoadingPastaAction]: (state, {payload: isLoadingPasta}) => ({
        ...state,
        isLoadingPasta
    }),

    [setIsLoadingPastaListAction]: (state, {payload: isLoadingPastaList}) => ({
        ...state,
        isLoadingPastaList
    }),

    [setIsSavingPastaAction]: (state, {payload: isSavingPasta}) => ({
        ...state,
        isSavingPasta
    }),

    [setLastCreatePastaAction]: (
        state, {
            payload: {
                lastCreatedObjectId,
                lastCreatedName
            }
        }
    ) => ({
        ...state,
        lastCreatedObjectId,
        lastCreatedName
    })
}, initialState);
