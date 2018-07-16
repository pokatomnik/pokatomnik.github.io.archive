import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

export default function MyHighlight(props) {
    const {
        children,
        ...restProps
    } = props;
    const text = children ? children.toString() : '';
    return (
        <Highlight {...restProps}>
            {text}
        </Highlight>
    );
}
