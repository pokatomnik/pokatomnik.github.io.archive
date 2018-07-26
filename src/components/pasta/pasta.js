import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import bem from '../../utils/bem';
import { BLOCK_NAME } from './constants';
import Highlight from '../common/highlight/highlight';
import DecryptInput from './decrypt-input';


export default class Pasta extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        encrypted: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: undefined,
            decrypted: true
        };

        this.onDecrypt = this.onDecrypt.bind(this);
        this.handleTryNewPassword = this.handleTryNewPassword.bind(this);
    }

    componentDidMount() {
        this.handleNewProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.handleNewProps(nextProps);
    }

    handleNewProps({
        text,
        encrypted
    }) {
        this.setState({
            text,
            decrypted: !encrypted
        });
    }

    handleTryNewPassword() {
        this.setState({decrypted: false});
    }

    onDecrypt(text) {
        this.setState({
            text,
            decrypted: true
        });
    }

    renderPastaText() {
        if (!this.state.decrypted) {
            return (
                <DecryptInput
                    encryptedText={this.props.text}
                    onDecrypt={this.onDecrypt}
                />
            )
        }

        return (
            <Highlight className={bem(BLOCK_NAME, 'text-container')}>
                {this.state.text}
            </Highlight>
        );
    }

    render() {
        const {
            name,
            encrypted
        } = this.props;

        return (
            <Row>
                <Col md={12}>
                    <Panel>
                        <Panel.Heading className={bem(BLOCK_NAME, 'name-header').toString()}>
                            {name}
                            {(encrypted && this.state.decrypted) && (
                                <span className="pull-right">
                                    Looks bad?&nbsp;
                                    <Button
                                        bsSize="xsmall"
                                        bsStyle="primary"
                                        onClick={this.handleTryNewPassword}
                                    >
                                            Try new key
                                    </Button>
                                </span>
                            )}
                        </Panel.Heading>
                        <Panel.Body className={bem(BLOCK_NAME, 'text-view').toString()}>
                            {this.renderPastaText()}
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
