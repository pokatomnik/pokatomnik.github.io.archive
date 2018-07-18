import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import bem from '../../utils/bem';
import Placeholder from '../common/placeholder/placeholder';
import Link from '../common/link/link';
import dateTime from '../../utils/date-time';
import { BLOCK_NAME } from './constants';
import Highlight from '../common/highlight/highlight';


PastaData.propTypes = {
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

function renderPastaText(text) {
    if (!text) {
        return (
            <span />
        );
    }
    return (
        <Highlight className={bem(BLOCK_NAME, 'text-container')}>
            {text}
        </Highlight>
    );
}

export default function PastaData({
    ready,
    currentPastaName,
    currentPastaText,
    currentPastaOwner,
    currentPastaOwnerId,
    currentPastaCreated,
    currentPastaEncrypted
}) {
    return (
        <Row>
            <Col md={8}>
                <Panel>
                    <Panel.Heading className={bem(BLOCK_NAME, 'name-header').toString()}>
                        <Placeholder
                            type="textRow"
                            ready={ready}
                        >
                                <span>
                                    {currentPastaName}
                                </span>
                        </Placeholder>
                    </Panel.Heading>
                    <Panel.Body className={bem(BLOCK_NAME, 'text-view').toString()}>
                        <Placeholder
                            type="text"
                            ready={ready}
                            rows={12}
                        >
                            {renderPastaText(currentPastaText)}
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
