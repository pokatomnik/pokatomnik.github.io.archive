import React from 'react';

import ResetPassword from '../reset-password/reset-password';


const BLOCK_NAME = 'route-reset-password';

export default function RouteResetPassword() {
    return (
        <div className={BLOCK_NAME}>
            <ResetPassword />
        </div>
    );
}
