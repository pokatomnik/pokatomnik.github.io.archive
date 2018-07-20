import React from 'react';
import PropTypes from 'prop-types';

import './fuck-autocomplete.css';

const BLOCK_NAME = 'fuck-autocomplete';

const getRandomString = () => Math.random().toString(36).substring(2);

FuckAutocomplete.propTypes = {
    type: PropTypes.oneOf([
        'password',
        'text',
        'email'
    ])
};

FuckAutocomplete.defaultProps = {
    type: 'text'
};

export default function FuckAutocomplete({type}) {
    return (
        <input
            type={type}
            name={getRandomString()}
            className={BLOCK_NAME}
        />
    );
}