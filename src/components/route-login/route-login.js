import React from 'react';
import Login from '../login/login';
import Alert from 'react-bootstrap/lib/Alert';


const BLOCK_NAME = 'route-login';

export default function RouteLogin() {
    return (
        <div className={BLOCK_NAME}>
            <Alert bsStyle="warning">
                Authorization is not required, but authorized users could trace their pastas.
            </Alert>
            <Login />
        </div>
    );
}