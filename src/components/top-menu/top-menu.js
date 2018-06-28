import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-router-dom';

import bem from '../../utils/bem';

import './top-menu.css';


const BLOCK_CLASS = 'top-menu';

export default function TopMenu() {
    return (
        <Navbar collapseOnSelect className={bem(BLOCK_CLASS)}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Pasta 2.0</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        Create
                    </NavItem>
                    <NavDropdown title="Documentation" id="docsDropdown">
                        <MenuItem>
                            Read docs
                        </MenuItem>
                        <MenuItem>
                            FAQ
                        </MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    User Menu
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}