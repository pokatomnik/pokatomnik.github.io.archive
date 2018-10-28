import React from 'react';

import LastPastas from '../last-pastas/last-pastas';

const BLOCK_CLASS = 'route-last-pastas';

export default function RouteLastPastas() {
    return (
        <div className={BLOCK_CLASS}>
            <LastPastas />
        </div>
    );
}