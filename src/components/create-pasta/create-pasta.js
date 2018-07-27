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
import { actions as toastrActions } from 'react-redux-toastr';

import bem from '../../utils/bem';
import { setError } from '../../models/error';
import FuckAutocomplete from '../common/fuck-autocomplete/fuck-autocomplete';
import {dataToUrl} from '../../utils/create-url';
import { developerEmail } from '../../constants';
import './create-pasta.css';
import Link from '../common/link/link';

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
        addToastr: PropTypes.func.isRequired
    };

    static getInitialState() {
        return {
            name: '',
            text: '',
            encrypted: false,
            key: ''
        };
    }

    constructor(props) {
        super(props);

        this.state = CreatePasta.getInitialState();

        this.handleEncryptChange = this.handleEncryptChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleToggleEncryption = this.handleToggleEncryption.bind(this);
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
                    title: 'A new Pasta has been created',
                    message: (
                        <span>
                            Click&nbsp;
                            <Link to={url} href={url}>
                                here
                            </Link>&nbsp;
                            to see It.
                        </span>
                    ),
                    options: {
                        showCloseButton: true, // true by default
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
