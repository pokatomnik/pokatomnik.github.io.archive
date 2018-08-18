import React from 'react';

export default function DownloadBlob(props) {
    const {
        children,
        ...restProps
    } = props;
    return (
        <a
            {...restProps}
            className={`btn btn-success ${props.className ? props.className : ''}`}
        >
            {children}
        </a>
    );
}
