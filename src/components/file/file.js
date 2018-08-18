import React, {PureComponent} from 'react';
import FileInput from '../common/file-input/file-input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import EncryptionView from './encryption-view';
import {encrypt, decrypt} from '../../utils/encryption';


const BLOCK_NAME = 'file';
const INVALID_FILE_ERROR = 'Add a file to encrypt.';
const INVALID_ENCRYPTION_KEY_ERROR = 'Encryption key is required. You must specify It.';
const INVALID_DECRYPTION_KEY_ERROR = 'Decryption key is required. You must specify It';

export default class File extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        };

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(file) {
        this.setState({file});
    }

    render() {
        return (
            <div className={BLOCK_NAME}>
                <Row>
                    <Col md={12}>
                        <FileInput onChange={this.handleFileChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <EncryptionView
                            title="Encrypt file"
                            file={this.state.file}
                            invalidFileError={INVALID_FILE_ERROR}
                            invalidKeyError={INVALID_ENCRYPTION_KEY_ERROR}
                            method={encrypt}
                        />
                        <EncryptionView
                            title="Decrypt file"
                            file={this.state.file}
                            invalidFileError={INVALID_FILE_ERROR}
                            invalidKeyError={INVALID_DECRYPTION_KEY_ERROR}
                            method={decrypt}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}