import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Link from '../common/link/link';

import bem from '../../utils/bem';

import './top-menu.css';


const BLOCK_CLASS = 'top-menu';

export default function TopMenu() {
    return (
        <Navbar collapseOnSelect className={bem(BLOCK_CLASS)}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link component="a" to="/">
                        Pasta 2.0
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        Create
                    </NavItem>
                    <NavDropdown title="Documentation" id="docsDropdown">
                        <Link to="/docs" component={MenuItem}>
                            Read docs
                        </Link>
                        <Link to="/faq" component={MenuItem}>
                            FAQ
                        </Link>
                        <MenuItem divider />
                        <Link to="/about" component={MenuItem}>
                            About
                        </Link>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
