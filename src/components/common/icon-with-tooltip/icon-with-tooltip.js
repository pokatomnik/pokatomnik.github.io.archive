import React from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import bem from '../../../utils/bem';
import './icon-with-tooltip.css';

const BLOCK_NAME = 'icon-with-tooltip';


IconWithTooltip.propTypes = {
    glyph: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    tooptipText: PropTypes.string
};

IconWithTooltip.defaultProps = {
    className: '',
    onClick: null,
    tooltipText: ''
};

export default function IconWithTooltip({
    id,
    glyph,
    className,
    onClick,
    tooltipText,
    ...restProps
}) {
    const iconClasses = bem(BLOCK_NAME, 'icon', {
        clickable: Boolean(onClick)
    });
    const finalClass = `${iconClasses} ${className}`
    const icon = (
        <Glyphicon
            glyph={glyph}
            className={finalClass}
            onClick={onClick}
            {...restProps}
        />
    );

    if (!tooltipText) {
        return icon;
    }

    const tooltip = (
        <Tooltip id={id}>
            {tooltipText}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="top"
            overlay={tooltip}
        >
            {icon}
        </OverlayTrigger>
    );
}
