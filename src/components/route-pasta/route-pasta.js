import React from 'react';
import Pasta from '../pasta/pasta';

const BLOCK_NAME = 'route-pasta';

export default function RoutePasta() {
    const [{
        match: {
            params: {
                id: objectId
            }
        }
    }] = arguments;
    return (
        <div className={BLOCK_NAME}>
            <Pasta objectId={objectId} />
        </div>
    );
}