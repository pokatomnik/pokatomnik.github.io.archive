import React, {PureComponent} from 'react';
import FileInput from '../common/file-input/file-input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import EncryptionView from './encryption-view';
import {encrypt, decrypt} from '../../utils/encryption';


const BLOCK_NAME = 'file';

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