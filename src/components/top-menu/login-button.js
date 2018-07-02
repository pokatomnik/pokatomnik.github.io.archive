import React from 'react';
import NavItem from 'react-bootstrap/lib/NavItem';
import Link from '../common/link/link';

export default function LoginButton() {
    return (
        <Link to="/login" component={NavItem}>
            Login
        </Link>
    );
}
