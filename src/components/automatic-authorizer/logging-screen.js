import React from 'react';
import PropTypes from 'prop-types';

import bem from '../../utils/bem';
import { BLOCK_NAME } from './automatic-authorizer';


LoggingScreen.propTypes = {
    visible: PropTypes.bool.isRequired
};

export default function LoggingScreen({visible}) {
    return (
        <div className={bem(BLOCK_NAME, 'logging-screen', {visible}).toString()}>
            <h4 className={bem(BLOCK_NAME, 'logging-screen-header').toString()}>
                Logging in...
            </h4>
            <div className={bem(BLOCK_NAME, 'logging-screen-preloader').toString()} />
        </div>
    );
}
