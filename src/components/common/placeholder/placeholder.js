/**
 * This component is required only for automatic importing of
 * css file
 */

import React from 'react';
import Placeholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function MyPlaceholder(props) {
    const {
        children,
        ...restProps
    } = props;
    return (
        <Placeholder {...restProps}>
            {children}
        </Placeholder>
    );
}
