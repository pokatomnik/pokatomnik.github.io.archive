import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import {
    selectErrorExists,
    selectErrorMessage,
    selectErrorTitle,
    removeError
} from '../../models/error';
import { developerEmail } from '../../constants';


class ErrorModal extends PureComponent {
    static propTypes = {
        errorExists: PropTypes.bool.isRequired,
        errorTitle: PropTypes.string,
        errorMessage: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.handleSendError = this.handleSendError.bind(this);
    }

    handleSendError() {
        window.open(`mailto:${developerEmail}?subject=Error`, '_blank');
    }

    render() {
        const {
            errorExists,
            errorTitle,
            errorMessage,
            removeError
        } = this.props;

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
                    <Button
                        bsStyle="warning"
                        onClick={this.handleSendError}
                    >
                        Send error
                    </Button>
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
}

const actionsMap = {removeError};

const mapStateToProps = (state) => ({
    errorExists: selectErrorExists(state),
    errorTitle: selectErrorTitle(state),
    errorMessage: selectErrorMessage(state)
});

export default connect(mapStateToProps, actionsMap)(ErrorModal);
