import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import bem from '../../utils/bem';
import Placeholder from '../common/placeholder/placeholder';
import Link from '../common/link/link';
import dateTime from '../../utils/date-time';
import { BLOCK_NAME } from './constants';
import Highlight from '../common/highlight/highlight';
import DecryptInput from './decrypt-input';


export default class PastaData extends Component {
    static propTypes = {
        ready: PropTypes.bool.isRequired,
        currentPastaName: PropTypes.string,
        currentPastaText: PropTypes.string,
        currentPastaCreated: PropTypes.number,
        currentPastaEncrypted: PropTypes.bool,
        currentPastaOwnerId: PropTypes.string,
        currentPastaOwner: PropTypes.shape({
            lastLogin: PropTypes.number.isRequired,
            userStatus: PropTypes.string.isRequired,
            created: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            isAdmin: PropTypes.bool.isRequired,
            ownerId: PropTypes.string.isRequired,
            socialAccount: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            objectId: PropTypes.string.isRequired,
            updated: PropTypes.number,
        }),
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
        ready,
        currentPastaEncrypted,
        currentPastaText
    }) {
        if (!ready) {
            return;
        }

        this.setState({
            text: currentPastaText,
            decrypted: currentPastaEncrypted === false
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
        if (!this.props.ready) {
            return (
                <span />
            );
        }

        if (!this.state.decrypted) {
            return (
                <DecryptInput
                    encryptedText={this.props.currentPastaText}
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
            ready,
            currentPastaName,
            currentPastaOwner,
            currentPastaOwnerId,
            currentPastaCreated,
            currentPastaEncrypted
        } = this.props;

        return (
            <Row>
                <Col md={8}>
                    <Panel>
                        <Panel.Heading className={bem(BLOCK_NAME, 'name-header').toString()}>
                            <Placeholder
                                type="textRow"
                                ready={ready}
                            >
                                <div>
                                    {currentPastaName}
                                    {(currentPastaEncrypted && this.state.decrypted) && (
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
                                </div>
                            </Placeholder>
                        </Panel.Heading>
                        <Panel.Body className={bem(BLOCK_NAME, 'text-view').toString()}>
                            <Placeholder
                                type="text"
                                ready={ready}
                                rows={12}
                            >
                                {this.renderPastaText()}
                            </Placeholder>
                        </Panel.Body>
                    </Panel>
                </Col>
                <Col md={4}>
                    <Panel>
                        <Panel.Heading>
                            Author:
                        </Panel.Heading>
                        <Panel.Body>
                            <Placeholder
                                type="textRow"
                                ready={ready}
                            >
                                <span>
                                    {
                                        currentPastaOwner && (
                                            <span>
                                                {currentPastaOwner.name}
                                                &nbsp;(
                                                <Link
                                                    to={`/user/${currentPastaOwnerId}`}
                                                    component="a"
                                                    href={`/user/${currentPastaOwnerId}`}
                                                >
                                                    View profile
                                                </Link>
                                                )
                                            </span>
                                        )
                                    }
                                </span>
                            </Placeholder>
                        </Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            Created:
                        </Panel.Heading>
                        <Panel.Body>
                            <Placeholder
                                type="textRow"
                                ready={ready}
                            >
                                <span>
                                    {dateTime(currentPastaCreated)}
                                </span>
                            </Placeholder>
                        </Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            Encrypted
                        </Panel.Heading>
                        <Panel.Body>
                            <Placeholder
                                type="textRow"
                                ready={ready}
                            >
                                <span>
                                    {currentPastaEncrypted ? 'Yes' : 'No'}
                                </span>
                            </Placeholder>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
