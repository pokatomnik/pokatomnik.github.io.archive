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

import { BLOCK_NAME } from './route-login';
import {login} from '../../models/user';
import bem from '../../utils/bem';


class Login extends PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired
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
            password,
            stayLoggedIn
        } = this.state;
        this.props.login(email, password);
    }

    render() {
        return (
            <Row>
                <Col md={4} />
                <Col md={4}>
                    <div className={bem(BLOCK_NAME, 'form')}>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <ControlLabel>
                                    Email:
                                </ControlLabel>
                                <FormControl
                                    type="email"
                                    placeholder="john.doe@example.com"
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
                                    onChange={this.handlePasswordChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Checkbox onChange={this.handleStayLoggedInChange}>
                                    Remember me
                                </Checkbox>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" bsStyle="success" className="pull-right">
                                    Login
                                </Button>
                            </FormGroup>
                        </form>
                    </div>
                </Col>
                <Col md={4} />
            </Row>
        );
    }
}

const actionsMap = {login};

export default connect(null, actionsMap)(Login);
