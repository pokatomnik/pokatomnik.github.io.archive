import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Link from '../common/link/link';

import {
    selectErrorExists,
    selectErrorMessage,
    selectErrorTitle,
    removeError
} from '../../models/error';

ErrorModal.propTypes = {
    errorExists: PropTypes.bool.isRequired,
    errorTitle: PropTypes.string,
    errorMessage: PropTypes.string
};

function ErrorModal({
    errorExists,
    errorTitle,
    errorMessage,
    removeError
}) {
    return (
        <Modal show={errorExists} onHide={removeError}>
            <Modal.Header>
                <Modal.Title>
                    {errorTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Link
                    bsStyle="warning"
                    to="/feedback"
                    beforeGo={removeError}
                    component={Button}
                >
                    Send error
                </Link>
                <Button
                    bsStyle="danger"
                    onClick={removeError}
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const actionsMap = {removeError};

const mapStateToProps = (state) => ({
    errorExists: selectErrorExists(state),
    errorTitle: selectErrorTitle(state),
    errorMessage: selectErrorMessage(state)
});

export default connect(mapStateToProps, actionsMap)(ErrorModal);
