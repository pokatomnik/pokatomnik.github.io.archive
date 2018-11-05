import React from 'react';

import Feedback from '../feedback/feedback';


const BLOCK_NAME = 'route-feedback';

export default function RouteFeedback() {
    return (
        <div className={BLOCK_NAME}>
            <Feedback />
        </div>
    );
}