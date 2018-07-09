import React, { PureComponent } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    login,
    selectUserLoggingIn,
    selectUserLoggingOut,
    selectUserIsLoggedIn,
} from '../../models/user';
import { credentialsToBase64 } from '../../utils/base64';
import { authKey } from '../../constants';


class Login extends PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired,
        userLoggingIn: PropTypes.bool.isRequired,
        userLoggingOut: PropTypes.bool.isRequired,
        userIsLoggedIn: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            stayLoggedIn: false,
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleStayLoggedInChange = this.handleStayLoggedInChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps({userIsLoggedIn: newUserIsLoggedIn}) {
        const {userIsLoggedIn: oldUserIsLoggedIn} = this.props;
        if ((!oldUserIsLoggedIn && newUserIsLoggedIn) && this.state.stayLoggedIn) {
            const {email, password} = this.state;
            localStorage.setItem(authKey, credentialsToBase64({
                email,
                password
            }));
        }
    }

    handleEmailChange({target: {value: email}}) {
        this.setState({email});
    }

    handlePasswordChange({target: {value: password}}) {
        this.setState({password});
    }

    handleStayLoggedInChange({target: {checked: stayLoggedIn}}) {
        this.setState({stayLoggedIn});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const {
            email,
            password
        } = this.state;
        this.props.login(email, password);
    }

    isBusy() {
        return this.props.userLoggingIn || this.props.userLoggingOut;
    }

    render() {
        const busy = this.isBusy();
        return (
            <Row>
                <Col md={4} />
                <Col md={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>
                                Email:
                            </ControlLabel>
                            <FormControl
                                type="email"
                                placeholder="john.doe@example.com"
                                disabled={busy}
                                onChange={this.handleEmailChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>
                                Password:
                            </ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="mystrongpassword123"
                                disabled={busy}
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Checkbox
                                onChange={this.handleStayLoggedInChange}
                                disabled={busy}
                            >
                                Remember me
                            </Checkbox>
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit"
                                bsStyle="success"
                                className="pull-right"
                                disabled={busy}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </Col>
                <Col md={4} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    userLoggingIn: selectUserLoggingIn(state),
    userLoggingOut: selectUserLoggingOut(state),
    userIsLoggedIn: selectUserIsLoggedIn(state)
});

const actionsMap = {login};

export default connect(mapStateToProps, actionsMap)(Login);
