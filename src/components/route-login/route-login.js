import React from 'react';
import Login from './login';

export const BLOCK_NAME = 'route-login';

export default function RouteLogin() {
    return (
        <div className={BLOCK_NAME}>
            <Login />
        </div>
    );
}