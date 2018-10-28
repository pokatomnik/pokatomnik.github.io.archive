import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Image from 'react-bootstrap/lib/Image';
import Nav from 'react-bootstrap/lib/Nav';

import bem from '../../utils/bem';
import {logout, selectUserName, selectGravatarUrl} from '../../models/users/users';
import {BLOCK_CLASS} from './constants';
import Link from '../common/link/link';


UserMenu.propTypes = {
    name: PropTypes.string.isRequired,
    gravatarUrl: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

function UserMenu({name, logout, gravatarUrl}) {
    const title = (
        <span>
            {gravatarUrl && (
                <React.Fragment>
                    <Image
                        circle
                        src={gravatarUrl}
                        className={bem(BLOCK_CLASS, 'gravatar').toString()}
                    />
                    &nbsp;
                </React.Fragment>
            )}
            <span>{name}</span>
        </span>
    );
    return (
        <Nav pullRight>
            <NavDropdown title={title} id="user-menu">
                <Link to="/last-pastas" component={MenuItem}>
                    My last Pastas
                </Link>
                <MenuItem disabled>
                    Profile
                </MenuItem>
                <MenuItem divider />
                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </NavDropdown>
        </Nav>
    );
}

const mapStateToProps = (state) => ({
    name: selectUserName(state),
    gravatarUrl: selectGravatarUrl(state)
});

const actionsMap = {logout};

export default connect(mapStateToProps, actionsMap)(UserMenu);
