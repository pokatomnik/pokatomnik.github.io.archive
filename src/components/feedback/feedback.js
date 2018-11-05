import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import bem from '../../utils/bem';
import {developerEmail} from '../../constants';
import './feedback.css';


const BLOCK_NAME = 'feedback';

export default function Feedback() {
    return (
        <Row>
            <Col md={2} />
            <Col md={4}>
                <h1>
                    Feedback
                </h1>
                <p>
                    I will be glad to hear your opinion. Please, feel free to share your experience.
                </p>
            </Col>
            <Col md={4}>
                <form
                    action={`https://formspree.io/${developerEmail}`}
                    method="POST"
                >
                    {/* TODO: replace 'thank-you' with a constant */}
                    <input type="hidden" name="_next" value={`${window.location.origin}/#!/thank-you`} />
                    <FormGroup>
                        <ControlLabel>
                            Name
                        </ControlLabel>
                        <FormControl
                            name="name"
                            placeholder="John Doe"
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>
                            Message
                        </ControlLabel>
                        <FormControl
                            className={bem(BLOCK_NAME, 'message').toString()}
                            componentClass="textarea"
                            placeholder="Your text"
                            rows={8}
                            name="message"
                        />
                    </FormGroup>
                    <FormGroup>
                        <ButtonGroup vertical block>
                            <Button
                                bsStyle="success"
                                type="submit"
                            >
                                Send
                            </Button>
                        </ButtonGroup>
                    </FormGroup>
                </form>
            </Col>
            <Col md={2} />
        </Row>
    );
}