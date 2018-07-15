import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

export default function MyHighlight(props) {
    const {
        children,
        ...restProps
    } = props;
    return (
        <Highlight {...restProps}>
            {children}
        </Highlight>
    );
}
