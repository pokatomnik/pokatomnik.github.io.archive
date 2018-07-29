import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';

Question.propTypes = {
    children: PropTypes.node.isRequired
};

export default function Question({children: question}) {
    return (
        <Panel.Heading>
            <Panel.Title toggle>
                <strong>Q:</strong> {question}
            </Panel.Title>
        </Panel.Heading>
    );
}
