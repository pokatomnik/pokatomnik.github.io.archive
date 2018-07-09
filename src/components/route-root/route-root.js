import React from 'react';

import CreatePasta from '../create-pasta/create-pasta';

export const BLOCK_NAME = 'route-root';

export default function RouteRoot() {
    return (
        <div className={BLOCK_NAME}>
            <CreatePasta />
        </div>
    );
};
