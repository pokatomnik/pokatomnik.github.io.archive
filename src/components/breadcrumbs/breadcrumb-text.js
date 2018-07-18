import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import find from 'lodash.find';

import {
    selectCurrentPastaName,
    selectIsLoadingPasta
} from '../../models/pastas';
import exceptions from './exceptions';


BreadcrumbText.propTypes = {
    /* from redux */
    pastaName: PropTypes.string,
    isLoadingPasta: PropTypes.bool.isRequired,

    /* common props */
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired,
};

/**
 * This component returns the real part of the url or another text described in exceptions.
 * @param props Component props
 * @returns React component
 */
function BreadcrumbText(props) {
    const {
        children,
        to,
        index
    } = props;
    const exception = find(
        exceptions,
        (exception) => (
            matchPath(to, exception.match) &&
            exception.index === index
        )
    );
    const result = exception ? exception.getUpdatedText(props) : children;
    return (
        <span>
            {result}
        </span>
    );
}

const mapStateToProps = (state) => ({
    pastaName: selectCurrentPastaName(state),
    isLoadingPasta: selectIsLoadingPasta(state)
});

export default connect(mapStateToProps)(BreadcrumbText);
