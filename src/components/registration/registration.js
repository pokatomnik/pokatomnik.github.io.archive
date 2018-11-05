import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import isEmpty from 'lodash.isempty';

import {
    registerUser,
    selectIsRegistering
} from '../../models/users/users';


const BLOCK_NAME = 'registration';
const STRONG_PASSWORD = '!v0$fF^11Hello!';
const INCORRECT_EMAIL = 'Incorrect email';
const SIMPLE_PASSWORD = 'Password is too simple';
const PASSWORD_MISMATCH = 'Passwords are not the same';
const EMPTY_FIELD = 'Please, fill the form';
const NO_ERROR = '';

const emailRegexp = (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);

class Registration extends PureComponent {
    static propTypes = {
        isRegistering: PropTypes.bool.isRequired,
        registerUser: PropTypes.func.isRequired
    };

    static getValidationState(err) {
        if (err) {
            return 'error';
        }
    }

    state = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',

        nameError: '',
        emailError: '',
        passwordError: ''
    };

    handleNameChange = ({target: {value: name}}) => {
        this.setState(() => ({name, nameError: NO_ERROR}));
    }

    handleEmailChange = ({target: {value: email}}) => {
        this.setState(() => ({email, emailError: NO_ERROR}));
    }

    handlePasswordChange = ({target: {value: password}}) => {
        this.setState(() => ({password, passwordError: NO_ERROR}));
    }

    handlePasswordRepeatChange = ({target: {value: passwordRepeat}}) => {
        this.setState(() => ({passwordRepeat, passwordError: NO_ERROR}));
    }

    validateForm = () => {
        const result = {};
        const {name, email, password, passwordRepeat} = this.state;
        if (!name) {
            result.nameError = EMPTY_FIELD;
        }

        if (!email) {
            result.emailError = EMPTY_FIELD;
        } else if (!emailRegexp.test(email)) {
            result.emailError = INCORRECT_EMAIL;
        }

        if (!password && !passwordRepeat) {
            result.passwordError = EMPTY_FIELD;
        } else if (password !== passwordRepeat) {
            result.passwordError = PASSWORD_MISMATCH;
        } else if (password.length < 8) {
            result.passwordError = SIMPLE_PASSWORD
        }

        if (isEmpty(result)) {
            return null;
        }

        return result;
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const validationResult = this.validateForm();
        if (!validationResult) {
            const {name, email, password} = this.state;
            this.props.registerUser({
                name,
                email,
                password
            });
        } else {
            this.setState(() => (validationResult));
        }
    }

    render() {
        const {isRegistering} = this.props;
        return (
            <Row className={BLOCK_NAME}>
                <Col md={2} />
                <Col md={4}>
                    <h1>
                        Registration
                    </h1>
                    <p>
                        Personal account is required for remembering created pastas
                    </p>
                </Col>
                <Col md={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            validationState={Registration.getValidationState(this.state.nameError)}
                        >
                            <ControlLabel>
                                Name
                            </ControlLabel>
                            <FormControl
                                disabled={isRegistering}
                                placeholder="John Doe"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            {this.state.nameError && (
                                <HelpBlock>
                                    {this.state.nameError}
                                </HelpBlock>
                            )}
                        </FormGroup>
                        <FormGroup
                            validationState={Registration.getValidationState(this.state.emailError)}
                        >
                            <ControlLabel>
                                Email
                            </ControlLabel>
                            <FormControl
                                disabled={isRegistering}
                                placeholder="john.doe@example.com"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                            {this.state.emailError && (
                                <HelpBlock>
                                    {this.state.emailError}
                                </HelpBlock>
                            )}
                        </FormGroup>
                        <FormGroup
                            validationState={Registration.getValidationState(this.state.passwordError)}
                        >
                            <ControlLabel>
                                Password
                            </ControlLabel>
                            <FormControl
                                disabled={isRegistering}
                                type="password"
                                placeholder={STRONG_PASSWORD}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            {this.state.passwordError && (
                                <HelpBlock>
                                    {this.state.passwordError}
                                </HelpBlock>
                            )}
                            <ControlLabel>
                                Repeat password
                            </ControlLabel>
                            <FormControl
                                disabled={isRegistering}
                                type="password"
                                placeholder={STRONG_PASSWORD}
                                value={this.state.passwordRepeat}
                                onChange={this.handlePasswordRepeatChange}
                            />
                        </FormGroup>
                        <ButtonGroup vertical block>
                            <Button
                                bsStyle="success"
                                type="submit"
                                disabled={isRegistering}
                            >
                                Sign up
                            </Button>
                        </ButtonGroup>
                    </form>
                </Col>
                <Col md={2} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    isRegistering: selectIsRegistering(state)
})

const actionsMap = {registerUser};

export default connect(mapStateToProps, actionsMap)(Registration);
