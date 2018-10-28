import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';

import {login} from '../../models/users/users';


class LoginForm extends PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: ''
        };
    }

    login = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const {email, password} = this.state;
        this.props.login(email, password);
    }

    onEmailChange = ({target: {value: email}}) => {
        this.setState({email});
    }

    onPasswordChange = ({target: {value: password}}) => {
        this.setState({password});
    }

    render() {
        return (
            <Navbar.Form pullRight>
                <form onSubmit={this.login}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            bsSize="small"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            bsSize="small"
                        />
                    </FormGroup>
                    <Button type="submit" bsStyle="success" bsSize="small">
                        Log in
                    </Button>
                </form>
            </Navbar.Form>
        );
    }
}

const actionsMap = {login};

export default connect(null, actionsMap)(LoginForm);
