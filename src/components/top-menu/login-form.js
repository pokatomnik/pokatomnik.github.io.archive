import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Navbar from 'react-bootstrap/lib/Navbar';
import Link from '../common/link/link';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import {
    login,
    selectIsUserLoggingIn
} from '../../models/users/users';


class LoginForm extends PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired,
        isUserLoggingIn: PropTypes.bool.isRequired
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
        const {isUserLoggingIn: disabled} = this.props;
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
                            disabled={disabled}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            bsSize="small"
                            disabled={disabled}
                        />
                    </FormGroup>
                    <SplitButton
                        type="submit"
                        bsStyle="success"
                        bsSize="small"
                        title="Log in"
                        id="login-button"
                        disabled={disabled}
                    >
                        <Link
                            component={MenuItem}
                            to="/registration"
                        >
                            Sign up
                        </Link>
                        <Link
                            component={MenuItem}
                            to="/reset-password"
                        >
                            Reset password
                        </Link>
                    </SplitButton>
                </form>
            </Navbar.Form>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserLoggingIn: selectIsUserLoggingIn(state)
});

const actionsMap = {login};

export default connect(mapStateToProps, actionsMap)(LoginForm);
