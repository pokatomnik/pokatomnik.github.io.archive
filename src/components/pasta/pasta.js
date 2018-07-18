import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    loadPastaById,
    selectIsLoadingPasta,
    selectCurrentPastaName,
    selectCurrentPastaText,
    selectCurrentPastaEncrypted,
    selectCurrentPastaOwnerId,
    selectCurrentPastaCreated,
    selectCurrentPastaOwner,
    removeCurrentPasta,
    selectPastaFetchError
} from '../../models/pastas';
import { selectUserIsLoggedIn } from '../../models/user';
import './pasta.css';
import Link from '../common/link/link';
import Error from '../error/error';
import PastaData from './pasta-data';


class Pasta extends PureComponent {
    static propTypes = {
        currentPastaName: PropTypes.string,
        currentPastaText: PropTypes.string,
        currentPastaEncrypted: PropTypes.bool,
        currentPastaOwnerId: PropTypes.string,
        currentPastaCreated: PropTypes.number,
        userIsLoggedIn: PropTypes.bool.isRequired,
        isLoadingPasta: PropTypes.bool.isRequired,
        loadPastaById: PropTypes.func.isRequired,
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
        pastaFetchError: PropTypes.shape({
            title: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        }),
        removeCurrentPasta: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.userIsLoggedIn) {
            this.handleNewObjectId(this.props);
        }
    }

    componentWillUnmount() {
        this.props.removeCurrentPasta()
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

    render() {
        const {
            isLoadingPasta,
            currentPastaName,
            currentPastaText,
            currentPastaEncrypted,
            currentPastaOwnerId,
            currentPastaCreated,
            currentPastaOwner,
            pastaFetchError
        } = this.props;
        const ready = !isLoadingPasta;
        if (pastaFetchError) {
            return (
                <Error
                    title={pastaFetchError.title}
                    message={pastaFetchError.message}
                >
                    Pasta is not accessible. Try to&nbsp;
                    <Link
                        to="/"
                        component="a"
                        href="/"
                    >
                        create
                    </Link>&nbsp;a new one.
                </Error>
            );
        }

        return (
            <PastaData
                currentPastaCreated={currentPastaCreated}
                currentPastaEncrypted={currentPastaEncrypted}
                currentPastaName={currentPastaName}
                currentPastaOwner={currentPastaOwner}
                currentPastaOwnerId={currentPastaOwnerId}
                currentPastaText={currentPastaText}
                ready={ready}
            />
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
    isLoadingPasta: selectIsLoadingPasta(state),
    currentPastaOwner: selectCurrentPastaOwner(state),
    pastaFetchError: selectPastaFetchError(state)
});

const actionsMap = {loadPastaById, removeCurrentPasta};

export default connect(mapStateToProps, actionsMap)(Pasta);
