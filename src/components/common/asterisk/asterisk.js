import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

Asterisk.propTypes = {
    symbol: PropTypes.string,
    tooltipText: PropTypes.string.isRequired,
    style: PropTypes.object
};

Asterisk.defaultProps = {
    symbol: '*'
};

const baseStyle = {
    color: '#f00',
    cursor: 'pointer'
};

const trigger = ['hover'];

export default function Asterisk({
    tooltipText,
    symbol,
    style
}) {
    return (
        <OverlayTrigger
            overlay={getToolTip(tooltipText)}
            placement="top"
            trigger={trigger}
        >
            <span
                style={{
                    ...baseStyle,
                    ...(style || {})
                }}
            >
                {symbol}
            </span>
        </OverlayTrigger>
    );
}

function getToolTip(text) {
    return (
        <Tooltip id={`asterisk-${text.replace(/ /g, '-')}`}>
            {text}
        </Tooltip>
    );
}