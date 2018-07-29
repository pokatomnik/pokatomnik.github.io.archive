import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';

Answer.propTypes = {
    children: PropTypes.node.isRequired
};

export default function Answer({children: answer}) {
    return (
        <Panel.Body collapsible>
            <strong>A:</strong> {answer}
        </Panel.Body>
    );
}
