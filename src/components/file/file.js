import React, {PureComponent} from 'react';
import FileInput from '../common/file-input/file-input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import Asterisk from '../common/asterisk/asterisk';
import {encrypt} from '../../utils/encryption';
import DownloadBlob from '../common/download-blob/download-blob';


const BLOCK_NAME = 'file';
const INVALID_KEY_ERROR = 'Encryption key is required. You must specify It.';
const INVALID_FILE_ERROR = 'Add a file to encrypt.';

export default class File extends PureComponent {
    static handleSelectAll({target}) {
        target.select();
    }

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            error: '',
            file: null
        };

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyChange({target: {value: key}}) {
        this.setState({
            key,
            error: '',
            downloadUrl: ''
        });
    }

    handleFileChange(file) {
        this.setState({file, downloadUrl: ''});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.state.file) {
            this.setState({
                error: INVALID_FILE_ERROR
            });
        } else if (!this.state.key) {
            this.setState({
                error: INVALID_KEY_ERROR
            });
        } else {
            const encryptedData = encrypt(this.state.file.result, this.state.key);
            const blob = new Blob([encryptedData], {type: "text/plain"});
            const downloadUrl = URL.createObjectURL(blob);
            console.log(downloadUrl);
            this.setState({
                downloadUrl
            });
        }
    }

    render() {
        return (
            <form className={BLOCK_NAME} onSubmit={this.handleSubmit}>
                <Row>
                    <Col md={12}>
                        <FileInput onChange={this.handleFileChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title>
                                    Encrypt file
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <ControlLabel>
                                                Set encryption key <Asterisk tooltipText="You must set encryption key" />
                                            </ControlLabel>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    {this.state.key ? '✔️' : '❌'}
                                                </InputGroup.Addon>
                                                <FormControl
                                                    type="password"
                                                    placeholder="Encryption key"
                                                    value={this.state.key}
                                                    onChange={this.handleKeyChange}
                                                    onFocus={File.handleSelectAll}
                                                />
                                                <InputGroup.Button>
                                                    <Button type="submit" bsStyle="success">
                                                        Encrypt
                                                    </Button>
                                                </InputGroup.Button>
                                            </InputGroup>
                                            {this.state.error && (
                                                <HelpBlock className="pull-right">
                                                    {this.state.error}
                                                </HelpBlock>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        {this.state.downloadUrl && (
                                            <FormGroup>
                                                <ControlLabel>
                                                    Click here to download compressed and encrypted file
                                                </ControlLabel>
                                                <InputGroup>
                                                    <DownloadBlob
                                                        target="_blank"
                                                        href={this.state.downloadUrl}
                                                        download={`${this.state.file.name}.pasta`}
                                                    >
                                                        Download
                                                    </DownloadBlob>
                                                </InputGroup>
                                            </FormGroup>
                                        )}
                                    </Col>
                                </Row>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </form>
        );
    }
}