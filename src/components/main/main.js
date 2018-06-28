import React from 'react';
import { Route } from 'react-router';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopMenu from '../top-menu/top-menu';
import bem from '../../utils/bem';
import RouteRoot from '../route-root/route-root';


const BLOCK_CLASS = 'main';

export default function Main() {
    return (
        <div className={bem(BLOCK_CLASS)}>
            <TopMenu />
            <div className="container">
                <Row>
                    <Col md={2} />
                    <Col md={8}>
                        <Route exact path="/" component={RouteRoot} />
                        <Route exact path="/login" component={null} />
                        <Route exact path="/profile" component={null} />
                    </Col>
                    <Col md={2} />
                </Row>
            </div>
        </div>
    );
}
