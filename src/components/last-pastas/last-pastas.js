import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import chunk from 'lodash.chunk';

import LastPasta from './last-pasta';
import {
    selectLastPastas,
    selectIsUserLoggedIn,
    selectIsUserLoggingIn,
    selectIsUserRetrieving
} from '../../models/users/users';

const ITEMS_PER_LINE = 2;

LastPastas.propTypes = {
    lastPastas: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        encrypted: PropTypes.bool.isRequired
    })).isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,
    isUserLoggingIn: PropTypes.bool.isRequired,
    isUserRetrieving: PropTypes.bool.isRequired
};

function LastPastas({
    lastPastas,
    isUserLoggedIn,
    isUserLoggingIn,
    isUserRetrieving
}) {
    if (!isUserLoggedIn && !isUserLoggingIn && !isUserRetrieving) {
        return (
            <h2>
                You are not logged in. Please do It first.
            </h2>
        );
    }

    if (isUserLoggingIn || isUserRetrieving) {
        return (
            <h2>
                Please, wait...
            </h2>
        );
    }

    return chunk(lastPastas, ITEMS_PER_LINE).map((chunk, index) => (
        <Row key={index}>
            {chunk.map(({encrypted, created, url, name}) => (
                <Col md={Math.round(12 / ITEMS_PER_LINE)} key={created}>
                    <LastPasta
                        encrypted={encrypted}
                        created={created}
                        url={url}
                        name={name}
                    />
                </Col>
            ))}
        </Row>
    ));
}

const mapStateToProps = (state) => ({
    lastPastas: selectLastPastas(state),
    isUserLoggedIn: selectIsUserLoggedIn(state),
    isUserLoggingIn: selectIsUserLoggingIn(state),
    isUserRetrieving: selectIsUserRetrieving(state)
});

export default connect(mapStateToProps)(LastPastas);
