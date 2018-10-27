import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Link from '../common/link/link';

import bem from '../../utils/bem';
import LoginForm from './login-form';
import UserMenu from './user-menu';
import './top-menu.css';
import {documentationHref} from '../../constants';
import {selectIsUserLoggedIn} from '../../models/users';
import {BLOCK_CLASS} from './constants';

TopMenu.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired
};

function TopMenu({isUserLoggedIn}) {
    return (
        <Navbar collapseOnSelect inverse className={bem(BLOCK_CLASS).toString()}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">
                        Pasta 2.0 <span role="img" aria-label="Pasta">🍝</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <Link
                        component={NavItem}
                        to="/"
                    >
                        Create
                    </Link>
                    <Link
                        component={NavItem}
                        to="/file"
                    >
                        Encrypt files
                    </Link>
                    <NavDropdown title="Documentation" id="docsDropdown">
                        <MenuItem
                            href={documentationHref}
                            target="_blank"
                        >
                            Documentation
                        </MenuItem>
                        <Link to="/faq" component={MenuItem}>
                            FAQ
                        </Link>
                        <MenuItem
                            href="https://github.com/pokatomnik/pokatomnik.github.io"
                            target="_blank"
                        >
                            Source code
                        </MenuItem>
                        <Link
                            component={MenuItem}
                            to="/conceit"
                        >
                            Conceit
                        </Link>
                        <MenuItem divider />
                        <Link to="/about" component={MenuItem}>
                            About Pasta
                        </Link>
                    </NavDropdown>
                    <Link
                        component={NavItem}
                        to="/feedback"
                    >
                        Feedback
                    </Link>
                </Nav>
                {!isUserLoggedIn && (
                    <LoginForm />
                )}
                {isUserLoggedIn && (
                    <UserMenu />
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => ({
    isUserLoggedIn: selectIsUserLoggedIn(state)
});

export default connect(mapStateToProps)(TopMenu);