import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import {actions as toastrActions} from 'react-redux-toastr';
import {Controlled as CodeMirror} from "react-codemirror2";

import bem from '../../utils/bem';
import {setError} from '../../models/error/error';
import FuckAutocomplete from '../common/fuck-autocomplete/fuck-autocomplete';
import {dataToUrl} from '../../utils/create-url';
import {developerEmail} from '../../constants';
import Link from '../common/link/link';
import Asterisk from '../common/asterisk/asterisk';
import './modes';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const BLOCK_NAME = 'create-pasta';
const trigger = ['hover'];
const UNBREAKABLE_SPACE = '\xa0';
const modeIds = [
    'clike',
    'css',
    'go',
    'haml',
    'htmlmixed',
    'javascript',
    'jsx',
    'pascal',
    'php',
    'python',
    'ruby',
    'rust',
    'sass',
    'shell',
    'sql',
    'swift'
];

const replaceWithUnbreakable = (str) => str.replace(/ /g, UNBREAKABLE_SPACE);
const overlayTooltipEncrypted = (
    <Tooltip id="encrypted">
        {replaceWithUnbreakable('This pasta should be encrypted')}
    </Tooltip>
);

const overlayTooltipNotEncrypted = (
    <Tooltip id="notEncrypted">
        {replaceWithUnbreakable('This pasta should not be encrypted')}
    </Tooltip>
);

class CreatePasta extends PureComponent {
    static propTypes = {
        setError: PropTypes.func.isRequired,
        addToastr: PropTypes.func.isRequired
    };

    static getInitialState() {
        return {
            name: '',
            text: '',
            encrypted: false,
            key: '',
            currentMode: modeIds[0]
        };
    }

    constructor(props) {
        super(props);

        this.state = CreatePasta.getInitialState();

        this.handleEncryptChange = this.handleEncryptChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.setEncrypted = this.setEncrypted.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
    }

    setEncrypted(encrypted) {
        this.setState({encrypted});
        if (!encrypted) {
            this.setState({key: ''});
        }
    }

    handleEncryptChange({target: {checked: encrypted}}) {
        this.setEncrypted(encrypted);
    }

    handleKeyChange({target: {value: key}}) {
        this.setState({key});
        if (key && !this.state.encrypted) {
            this.setEncrypted(true);
        } else if (!key && this.state.encrypted) {
            this.setEncrypted(false);
        }
    }

    handleModeChange({target: {value: currentMode}}) {
        this.setState({currentMode});
    }

    handleTextChange(editor, data, text) {
        this.setState({text});
    }

    handleNameChange({target: {value: name}}) {
        this.setState({name});
    }

    static handleSelectAll({target}) {
        target.select();
    }

    handleSubmitForm(evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        const error = this.validate();
        if (error) {
            const {title, message} = error;
            return this.props.setError(title, message);
        }

        const {name, text, key} = this.state;
        dataToUrl(name, text, key)
            .then((compressed) => {
                const url = `/pasta/${compressed}`;
                this.props.addToastr({
                    type: 'light',
                    title: name || 'Unnamed',
                    message: (
                        <span>
                            A new Pasta has been created. Click&nbsp;
                            <Link to={url} href={url}>
                                here
                            </Link>&nbsp;to see It.
                        </span>
                    ),
                    options: {
                        showCloseButton: true,
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                this.props.setError('Error creating', `Please report error to ${developerEmail}`);
            });

        this.setState(CreatePasta.getInitialState());
    }

    validate() {
        if (!this.state.text) {
            return {
                title: 'Empty message',
                message: 'Empty message could not be created'
            };
        }
    }

    render() {
        return (
            <Row>
                <form
                    className={BLOCK_NAME}
                    autoComplete="off"
                    onSubmit={this.handleSubmitForm}
                >
                    <FuckAutocomplete type="text" />
                    <FuckAutocomplete type="password" />
                    <Col md={8}>
                        <FormGroup>
                            <ControlLabel>
                                Pasta name
                            </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="My new great pasta"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                onFocus={CreatePasta.handleSelectAll}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>
                                Pasta text <Asterisk tooltipText="Text should not be empty"/>
                            </ControlLabel>
                            <CodeMirror
                                className={bem(BLOCK_NAME, 'code-editor').toString()}
                                viewportMargin={20}
                                onBeforeChange={this.handleTextChange}
                                value={this.state.text}
                                options={{
                                    mode: this.state.currentMode,
                                    theme: 'material',
                                    lineNumbers: true,
                                    autofocus: true,
                                    smartIndent: false
                                }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>
                                Highlight ({(
                                    <Asterisk
                                        tooltipText="Highlight does not impact result pasta"
                                        symbol="?"
                                    />
                                )})
                            </ControlLabel>
                            <FormControl
                                onChange={this.handleModeChange}
                                value={this.state.currentMode}
                                componentClass="select"
                            >
                                {modeIds.map((modeId) => (
                                    <option
                                        value={modeId}
                                        key={modeId}
                                    >
                                        {modeId}
                                    </option>
                                ))}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>
                                Set encryption key
                            </ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon
                                    className={bem(BLOCK_NAME, 'encrypt-toggler-wrapper').toString()}
                                >
                                    <OverlayTrigger
                                        placement="top"
                                        trigger={trigger}
                                        overlay={this.state.encrypted
                                            ? overlayTooltipEncrypted
                                            : overlayTooltipNotEncrypted
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            aria-label="Encrypt message"
                                            className={bem(BLOCK_NAME, 'encrypt-toggler')}
                                            checked={this.state.encrypted}
                                            readOnly
                                        />
                                    </OverlayTrigger>
                                </InputGroup.Addon>
                                <FormControl
                                    type="password"
                                    placeholder="Encryption key"
                                    value={this.state.key}
                                    onChange={this.handleKeyChange}
                                    onFocus={CreatePasta.handleSelectAll}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <ButtonGroup vertical block>
                                <Button
                                    bsStyle="success"
                                    type="submit"
                                >
                                    Create
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Col>
                </form>
            </Row>
        );
    }
}

const actionsMap = {
    setError,
    addToastr: toastrActions.add
};

export default connect(null, actionsMap)(CreatePasta);
