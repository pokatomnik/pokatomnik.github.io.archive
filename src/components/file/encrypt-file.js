import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

import Asterisk from '../common/asterisk/asterisk';
import DownloadBlob from '../common/download-blob/download-blob';
import {encrypt} from '../../utils/encryption';

const INVALID_KEY_ERROR = 'Encryption key is required. You must specify It.';
const INVALID_FILE_ERROR = 'Add a file to encrypt.';


export default class EncryptFile extends PureComponent {
    static propTypes = {
        file: PropTypes.shape({
            name: PropTypes.string.isRequired,
            lastModified: PropTypes.number.isRequired,
            size: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            result: PropTypes.string.isRequired
        }),
        title: PropTypes.string.isRequired
    };

    static handleSelectAll({target}) {
        target.select();
    }

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            error: '',
            downloadUrl: ''
        };

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate({file}) {
        if (file !== this.props.file) {
            this.setState({
                downloadUrl: ''
            });
        }
    }

    handleKeyChange({target: {value: key}}) {
        this.setState({
            key,
            error: '',
            downloadUrl: ''
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.props.file) {
            this.setState({
                error: INVALID_FILE_ERROR
            });
        } else if (!this.state.key) {
            this.setState({
                error: INVALID_KEY_ERROR
            });
        } else {
            const encryptedData = encrypt(this.props.file.result, this.state.key);
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
            <form onSubmit={this.handleSubmit}>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>
                            {this.props.title}
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
                                            onFocus={EncryptFile.handleSelectAll}
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
                                                download={`${this.props.file.name}.pasta`}
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
            </form>
        );
    }
}