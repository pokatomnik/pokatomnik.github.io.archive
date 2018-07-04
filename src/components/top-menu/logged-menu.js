import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Label from 'react-bootstrap/lib/Label';

import Link from '../common/link/link';
import {
    selectUserEmail,
    selectUserIsAdmin,
    selectUserName,
    logout
} from '../../models/user';


class LoggedMenu extends PureComponent {
    static propTypes = {
        userEmail: PropTypes.string.isRequired,
        userIsAdmin: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
    }

    render() {
        const {
            userName,
            userEmail,
            userIsAdmin
        } = this.props;

        const supTextComponent = (
            <sup>
                <Label bsStyle={userIsAdmin ? 'danger': 'primary'}>
                    {userIsAdmin ? 'admin' : 'user'}
                </Label>
            </sup>
        );

        return (
            <Nav pullRight>
                <NavDropdown title={`Hello, ${userName}`} id="loggedMenu">
                    <MenuItem header>
                        {userEmail}&nbsp;
                        {supTextComponent}
                    </MenuItem>
                    <Link to="/my-pastas" component={MenuItem}>
                        My Pastas
                    </Link>
                    <MenuItem divider/>
                    <MenuItem onClick={this.logout}>
                        Logout
                    </MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
}

const mapStateToProps = (state) => ({
    userEmail: selectUserEmail(state),
    userIsAdmin: selectUserIsAdmin(state),
    userName: selectUserName(state)
});

const actionsMap = {logout};

export default connect(mapStateToProps, actionsMap)(LoggedMenu);
