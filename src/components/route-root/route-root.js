import React, { PureComponent } from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { connect } from 'react-redux';

import bem from '../../utils/bem';
import './route-root.css';


const BLOCK_NAME = 'carousel';
const itemClassName = bem(BLOCK_NAME, 'item');
const captionClassName = bem(BLOCK_NAME, 'caption');

class RouteRoot extends PureComponent {
    render() {
        return (
            <Carousel>
                <Carousel.Item className={itemClassName}>
                    <Carousel.Caption className={captionClassName}>
                        <h1>Pasta is an encrypted text sharing service.</h1>
                        <p>Free. Secure. Fast</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={itemClassName}>
                    <Carousel.Caption className={captionClassName}>
                        <h1>Free</h1>
                        <p>I will not require any payments for using this service. I swear:)</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={itemClassName}>
                    <Carousel.Caption className={captionClassName}>
                        <h1>Secure</h1>
                        <p>I will not receive and/or store unencrypted messages. Client-side encryption and decryption.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={itemClassName}>
                    <Carousel.Caption className={captionClassName}>
                        <h1>Fast</h1>
                        <p>You'll have to paste/type your text, specify the encryption key and press "Create". That's all.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={itemClassName}>
                    <Carousel.Caption className={captionClassName}>
                        <h1>
                            I'd like to:
                        </h1>
                        <ButtonGroup className="pull-right">
                            <Link
                                className="btn btn-success"
                                to="/about"
                            >
                                Learn more
                            </Link>
                            <Link
                                className="btn btn-success"
                                to="/pasta"
                            >
                                Try
                            </Link>
                        </ButtonGroup>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default RouteRoot;