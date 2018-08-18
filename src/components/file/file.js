import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import FileInput from '../common/file-input/file-input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import EncryptionView from './encryption-view';
import {encrypt, decrypt} from '../../utils/encryption';
import {setError} from '../../models/error';

const BLOCK_NAME = 'file';
const GENERIC_READ_ERROR_TITLE = 'Read error';
const GENERIC_READ_ERROR_MESSAGE = 'Pasta can\'t read this file. It could be too big';

class File extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        };

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleReadError = this.handleReadError.bind(this);
    }

    handleFileChange(file) {
        this.setState({file});
    }

    handleReadError(error) {
        this.props.setError(
            GENERIC_READ_ERROR_TITLE,
            GENERIC_READ_ERROR_MESSAGE
        );
    }

    render() {
        return (
            <div className={BLOCK_NAME}>
                <Row>
                    <Col md={12}>
                        <FileInput
                            onChange={this.handleFileChange}
                            onReadError={this.handleReadError}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <EncryptionView
                            title="Encrypt file"
                            file={this.state.file}
                            method={encrypt}
                        />
                        <EncryptionView
                            title="Decrypt file"
                            file={this.state.file}
                            method={decrypt}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const actionsMap = {setError};

export default connect(null, actionsMap)(File);
