import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import {
    loadPastaById,
    selectIsLoadingPasta,
    selectCurrentPastaName,
    selectCurrentPastaText,
    selectCurrentPastaEncrypted,
    selectCurrentPastaOwnerId,
    selectCurrentPastaCreated
} from '../../models/pastas';
import { selectUserIsLoggedIn } from '../../models/user';
import Placeholder from '../common/placeholder/placeholder';
import Highlight from '../common/highlight/highlight';

class Pasta extends PureComponent {
    static propTypes = {
        currentPastaName: PropTypes.string,
        currentPastaText: PropTypes.string,
        currentPastaEncrypted: PropTypes.bool,
        currentPastaOwnerId: PropTypes.string,
        currentPastaCreated: PropTypes.number,
        userIsLoggedIn: PropTypes.bool.isRequired,
        isLoadingPasta: PropTypes.bool.isRequired,
        loadPastaById: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.userIsLoggedIn) {
            this.handleNewObjectId(this.props);
        }
    }

    componentWillReceiveProps(newProps) {
        const objectIdChanged = newProps.objectId !== this.props.objectId;
        const userBecomeLoggedIn = newProps.userIsLoggedIn && !this.props.userIsLoggedIn;
        if (objectIdChanged || userBecomeLoggedIn) {
            this.handleNewObjectId(newProps);
        }
    }

    handleNewObjectId({objectId}) {
        this.props.loadPastaById(objectId);
    }

    renderEncrypted(encrypted) {
        return encrypted ? 'Yes' : 'No';
    }

    render() {
        const {
            isLoadingPasta,
            currentPastaName,
            currentPastaText,
            currentPastaEncrypted,
            currentPastaOwnerId,
            currentPastaCreated
        } = this.props;
        const ready = !isLoadingPasta;
        return (
            <Row>
                <Col md={8}>
                    <Panel>
                        <Panel.Heading>
                            <Placeholder
                                type="textRow"
                                ready={ready}
                            >
                                <span>
                                    {currentPastaName}
                                </span>
                            </Placeholder>
                        </Panel.Heading>
                        <Panel.Body>
                            <Placeholder
                                type="text"
                                ready={ready}
                                rows={10}
                            >
                                <Highlight>
                                    {currentPastaText}
                                </Highlight>
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
                                    {currentPastaOwnerId}
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
                                    {currentPastaCreated}
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
                                    {this.renderEncrypted(currentPastaEncrypted)}
                                </span>
                            </Placeholder>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    currentPastaName: selectCurrentPastaName(state),
    currentPastaText: selectCurrentPastaText(state),
    currentPastaEncrypted: selectCurrentPastaEncrypted(state),
    currentPastaOwnerId: selectCurrentPastaOwnerId(state),
    currentPastaCreated: selectCurrentPastaCreated(state),
    userIsLoggedIn: selectUserIsLoggedIn(state),
    isLoadingPasta: selectIsLoadingPasta(state)
});

const actionsMap = {loadPastaById};

export default connect(mapStateToProps, actionsMap)(Pasta);
