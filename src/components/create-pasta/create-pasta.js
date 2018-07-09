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

import bem from '../../utils/bem';
import { setError } from '../../models/error';
import { createPasta } from '../../models/pastas';
import './create-pasta.css';

const BLOCK_NAME = 'create-pasta';
const trigger = ['hover'];
const overlayTooltip = (
    <Tooltip id="Encrypt pasta">
        Encrypt pasta
    </Tooltip>
);

class CreatePasta extends PureComponent {
    static propTypes = {
        setError: PropTypes.func.isRequired,
        createPasta: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            text: '',
            encrypted: false,
            key: ''
        };

        this.handleEncryptChange = this.handleEncryptChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleToggleEncryption = this.handleToggleEncryption.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleEncryptChange({target: {checked: encrypted}}) {
        this.setState({encrypted});
    }

    handleKeyChange({target: {value: key}}) {
        this.setState({key});
    }

    handleTextChange({target: {value: text}}) {
        this.setState({text});
    }

    handleNameChange({target: {value: name}}) {
        this.setState({name});
    }

    handleToggleEncryption() {
        this.setState({
            encrypted: !this.state.encrypted
        });
    }

    handleSelectAll({target}) {
        target.select();
    }

    handleSubmitForm(evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        const error = this.validate();
        if (error) {
            const {title, message} = this.validate();
            return this.prop.setError(title, message);
        }

        const {
            name,
            text,
            encrypted,
            key
        } = this.state;
        this.props.createPasta(name, text, encrypted, key);
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
                    <input
                        type="text"
                        name="fakeusernameremembered"
                        className={bem(BLOCK_NAME, 'fuck-autocomplete')}
                    />
                    <input
                        type="password"
                        name="fakepasswordremembered"
                        className={bem(BLOCK_NAME, 'fuck-autocomplete')}
                    />
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
                                onFocus={this.handleSelectAll}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>
                                Pasta text
                            </ControlLabel>
                            <FormControl
                                className={bem(BLOCK_NAME, 'pasta-text').toString()}
                                componentClass="textarea"
                                placeholder="Your text"
                                rows={15}
                                value={this.state.text}
                                onChange={this.handleTextChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>
                                Set encryption key
                            </ControlLabel>
                            <InputGroup>
                                <OverlayTrigger
                                    placement="top"
                                    trigger={trigger}
                                    overlay={overlayTooltip}
                                >
                                    <InputGroup.Addon
                                        onClick={this.handleToggleEncryption}
                                        className={bem(BLOCK_NAME, 'encrypt-toggler-wrapper').toString()}
                                    >
                                        <input
                                            type="checkbox"
                                            aria-label="Encrypt message"
                                            className={bem(BLOCK_NAME, 'encrypt-toggler')}
                                            checked={this.state.encrypted}
                                            onChange={this.handleEncryptChange}
                                        />
                                    </InputGroup.Addon>
                                </OverlayTrigger>
                                <FormControl
                                    type="password"
                                    placeholder="Encryption key"
                                    disabled={!this.state.encrypted}
                                    value={this.state.key}
                                    onChange={this.handleKeyChange}
                                    onFocus={this.handleSelectAll}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button
                                bsStyle="success"
                                type="submit"
                            >
                                Create
                            </Button>
                        </FormGroup>
                    </Col>
                </form>
            </Row>
        );
    }
}

const actionsMap = {
    setError,
    createPasta
};

export default connect(null, actionsMap)(CreatePasta);
