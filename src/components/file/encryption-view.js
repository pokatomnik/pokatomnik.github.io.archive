import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
import {encrypt, decrypt} from '../../utils/encryption';
import DownloadButton from './download-button';
import {setError} from '../../models/error';


const INVALID_FILE_ERROR = 'Add a file to encrypt.';
const INVALID_ENCRYPTION_KEY_ERROR = 'Encryption key is required. You must specify It.';
const INVALID_DECRYPTION_KEY_ERROR = 'Decryption key is required. You must specify It';
const GENERIC_ERROR_TITLE = 'Can\'t do encryption things';
const GENERIC_ERROR_MESSAGE = 'Your encrypted file could be corrupted or Pasta has the error. ' +
    'Please, let me know more information about this issue.';
class EncryptionView extends PureComponent {
    static propTypes = {
        file: PropTypes.shape({
            name: PropTypes.string.isRequired,
            lastModified: PropTypes.number.isRequired,
            size: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            result: PropTypes.instanceOf(ArrayBuffer).isRequired
        }),
        title: PropTypes.string.isRequired,
        method: PropTypes.oneOf([encrypt, decrypt]).isRequired
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

    renderFileName(rawName) {
        if (this.props.method === encrypt) {
            return `${rawName}.pasta`;
        }
        const nameParts = this.props.file.name.split('.');
        nameParts.pop();
        return nameParts.join('.');
    }

    renderButtonCaption() {
        return this.props.method === encrypt ? 'Encrypt file' : 'Decrypt file';
    }

    renderDownloadCaption() {
        return this.props.method === encrypt
            ? 'Click here to download encrypted file'
            : 'Click here to download decrypted file'
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
                error: (this.props.method === encrypt)
                    ? INVALID_ENCRYPTION_KEY_ERROR
                    : INVALID_DECRYPTION_KEY_ERROR
            });
        } else {
            let encryptedData;
            try {
                encryptedData = this.props.method(this.props.file.result, this.state.key);
            } catch (e) {
                this.props.setError(GENERIC_ERROR_TITLE, GENERIC_ERROR_MESSAGE);
                return;
            }
            const blob = new Blob([encryptedData], {type: "text/plain"});
            const downloadUrl = URL.createObjectURL(blob);
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
                                            onFocus={EncryptionView.handleSelectAll}
                                        />
                                        <InputGroup.Button>
                                            <Button type="submit" bsStyle="success">
                                                {this.renderButtonCaption()}
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
                                    <DownloadButton
                                        downloadUrl={this.state.downloadUrl}
                                        downloadName={this.renderFileName(this.props.file.name)}
                                    >
                                        {this.renderDownloadCaption()}
                                    </DownloadButton>
                                )}
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            </form>
        );
    }
}

const actionsMap = {setError};

export default connect(null, actionsMap)(EncryptionView);
