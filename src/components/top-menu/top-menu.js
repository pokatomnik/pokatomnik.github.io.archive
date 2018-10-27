import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Link from '../common/link/link';

import bem from '../../utils/bem';
import User from './user';
import './top-menu.css';
import {documentationHref} from '../../constants';
import {BLOCK_CLASS} from './constants';

export default function TopMenu() {
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
                <User />
            </Navbar.Collapse>
        </Navbar>
    );
}
