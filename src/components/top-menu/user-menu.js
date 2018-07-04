import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';

import { selectUserIsLoggedIn } from '../../models/user';
import LoginButton from './login-button';
import LoggedMenu from './logged-menu';
import { authKey } from '../../constants';


class UserMenu extends PureComponent {
    static propTypes = {
        userIsLoggedIn: PropTypes.bool.isRequired
    };

    componentWillReceiveProps({userIsLoggedIn: newUserIsLoggedIn}) {
        const {userIsLoggedIn: oldUserIsLoggedIn} = this.props;
        if (!newUserIsLoggedIn && oldUserIsLoggedIn) {
            localStorage.removeItem(authKey);
        }
    }

    render() {
        const { userIsLoggedIn } = this.props;
        const UserComponent = userIsLoggedIn ? LoggedMenu : LoginButton;
        return (
            <Nav pullRight>
                <UserComponent />
            </Nav>
        );
    }
}

const mapStateToProps = (state) => ({
    userIsLoggedIn: selectUserIsLoggedIn(state)
});

export default connect(mapStateToProps)(UserMenu);
