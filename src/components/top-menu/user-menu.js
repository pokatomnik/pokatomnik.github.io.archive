import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';

import { selectUserIsLoggedIn } from '../../models/user';
import LoginButton from './login-button';
import LoggedMenu from './logged-menu';


UserMenu.propTypes = {
    userIsLoggedIn: PropTypes.bool.isRequired
};

function UserMenu ({userIsLoggedIn}) {
    const UserComponent = userIsLoggedIn ? LoggedMenu : LoginButton;
    return (
        <Nav pullRight>
            <UserComponent />
        </Nav>
    );
}

const mapStateToProps = (state) => ({
    userIsLoggedIn: selectUserIsLoggedIn(state)
});

export default connect(mapStateToProps)(UserMenu);
