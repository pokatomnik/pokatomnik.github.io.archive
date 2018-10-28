import memoize from 'lodash.memoize';
import md5 from 'md5';

import {branch} from './constants';


export const selectUserEmail = (state) => state[branch].email;

export const selectUserName = (state) => state[branch].name;

export const selectIsUserLoggedIn = (state) => Boolean(selectUserEmail(state));

export const selectIsUserLoggingIn = (state) => state[branch].loggingIn;

export const selectIsUserLoggingOut = (state) => state[branch].loggingOut;

export const selectIsUserRetrieving = (state) => state[branch].isRetrieving;

export const selectLastPastas = (state) => state[branch].lastPastas;

export const selectIsFetchingPastas = (state) => state[branch].isFetchingPastas;

export const selectGravatarUrl = memoize(
    // ?s={height}
    (state) => `https://www.gravatar.com/avatar/${md5(selectUserEmail(state))}?s=22`,
    (state) => selectUserEmail(state)
);
