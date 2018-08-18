import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Link from '../common/link/link';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { documentationHref } from '../../constants';


const BLOCK_NAME = 'route-about';

export default function RouteAbout() {
    return (
        <div className={BLOCK_NAME}>
            <Jumbotron>
                <h1>
                    Pasta 2.0
                </h1>
                <ButtonGroup className="pull-right">
                    <Link component={Button} bsStyle="success" to="/">
                        Try now
                    </Link>
                    {/* <Link component={Button} bsStyle="success" to="/docs">
                        Learn more
                    </Link> */}
                    <a
                        className="btn btn-success"
                        href={documentationHref}
                        target="_blank"
                    >
                        Lear more
                    </a>
                </ButtonGroup>
                <p>
                    Encrypted sharing service
                </p>
            </Jumbotron>
            <Row>
                <Col md={4}>
                    <h4>
                        Secure
                    </h4>
                    <p>
                        Every pasta is protected with end-to-end Blowfish algorithm.
                        No backend. No tracking. Your data is only yours.
                    </p>
                </Col>
                <Col md={4}>
                    <h4>
                        Free
                    </h4>
                    <p>
                        As long as Pasta is my home project It will be always free.
                    </p>
                </Col>
                <Col md={4}>
                    <h4>
                        Fast
                    </h4>
                    <p>
                        You'll get the link to your pasta immediately.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={3} />
                <Col md={6}>
                    <h3>
                        [UNDER CONSTRUCT NOTE]
                    </h3>
                    <p>This is the development version, some things could be changed.</p>
                    <p>
                        If you need something specific of me, just email me:
                    </p>
                    <a href="hugefast@gmail.com">hugefast@gmail.com</a>
                </Col>
                <Col md={3} />
            </Row>
        </div>
    );
}