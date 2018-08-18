import React, {PureComponent} from 'react';
import FileInput from '../common/file-input/file-input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import EncryptFile from './encrypt-file';


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
                        <EncryptFile title="Encrypt file" file={this.state.file} />
                    </Col>
                </Row>
            </div>
        );
    }
}