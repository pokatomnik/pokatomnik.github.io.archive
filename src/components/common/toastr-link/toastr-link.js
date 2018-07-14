import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from '../link/link';
import {
    selectLastCreatedObjectId,
    selectLastCreatedName,
    removeLastCreatedPasta
} from '../../../models/pastas';

class ToastrLink extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClickLink = this.handleClickLink.bind(this);
    }

    handleClickLink() {
        const {
            remove: removeCurrentToast,
            removeLastCreatedPasta
        } = this.props;
        removeCurrentToast();
        removeLastCreatedPasta();
    }

    render() {
        const {
            lastCreatedObjectId,
            lastCreatedName
        } = this.props;
        return (
            <span>
            Check&nbsp;
                <Link
                    component="a"
                    to={`/pasta/${lastCreatedObjectId}`}
                    beforeGo={this.handleClickLink}
                >
                {lastCreatedName}
            </Link>
                &nbsp;now
        </span>
        );
    }
}

ToastrLink.propTypes = {
    lastCreatedObjectId: PropTypes.string.isRequired,
    lastCreatedName: PropTypes.string.isRequired,
    removeLastCreatedPasta: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    lastCreatedObjectId: selectLastCreatedObjectId(state),
    lastCreatedName: selectLastCreatedName(state)
});

/*
    mapDispatchToProps should be used here instead of actionsMap
    because of recursive dependencies of two ES modules:
        - pastas.js (redux duck)
        - this component
*/
const mapDispatchToProps = (dispatch) => ({
    removeLastCreatedPasta: () => {
        removeLastCreatedPasta()(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastrLink);
