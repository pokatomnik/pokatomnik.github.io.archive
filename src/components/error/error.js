import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


Error.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
    ])
};

export default function Error({
    title,
    message,
    children
}) {
    return (
        <Row>
            <Col md={12}>
                <h1>
                    {title}
                </h1>
                <p>
                    {message}
                </p>
                {children && (
                    <p>
                        {children}
                    </p>
                )}
            </Col>
        </Row>
    );
}
