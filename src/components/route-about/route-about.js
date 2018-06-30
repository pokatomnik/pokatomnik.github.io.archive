import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Link from '../common/link/link';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';


const BLOCK_NAME = 'route-about';

export default function RouteAbout() {
    return (
        <div className={BLOCK_NAME}>
            <Jumbotron>
                <h1>
                    Pasta 2.0
                </h1>
                <p>
                    Encrypted sharing service
                </p>
                <ButtonGroup className="pull-right">
                    <Link component={Button} bsStyle="success" to="/pasta">
                        Try now
                    </Link>
                    <Link component={Button} bsStyle="success" to="/about">
                        Learn more
                    </Link>
                </ButtonGroup>
            </Jumbotron>
            <Row>
                <Col md={4}>
                    <h4>
                        Secure
                    </h4>
                    <p>
                        Every pasta is protected with end-to-end Blowfish algorithm
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
                        I do not request any complicated things. Just paste the text and go ahead.
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