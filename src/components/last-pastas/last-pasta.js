import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Panel from 'react-bootstrap/lib/Panel';

import IconWithTooltip from '../common/icon-with-tooltip/icon-with-tooltip';
import {
    removeLastPastaById,
    selectIsRemovingLastPasta,
    selectIsFetchingPastas
} from '../../models/users/users';
import bem from '../../utils/bem';
import './last-pasta.css';


const formatDate = (timestamp) => Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
}).format(timestamp);

const BLOCK_CLASS = 'last-pasta';

class LastPasta extends PureComponent {
    static propTypes = {
        removeLastPastaById: PropTypes.func.isRequired,
        objectId: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        encrypted: PropTypes.bool.isRequired,
        created: PropTypes.number.isRequired,
        push: PropTypes.func.isRequired,
        isRemovingLastPasta: PropTypes.bool.isRequired,
        isFetchingPastas: PropTypes.bool.isRequired
    };

    go = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.push(this.props.url);
    }

    removeLastPastaById = () => {
        this.props.removeLastPastaById(this.props.objectId);
    }

    renderRemoveIcon = (iconClassString) => {
        const {
            isRemovingLastPasta,
            isFetchingPastas,
            objectId
        } = this.props;
        const disabled = isRemovingLastPasta || isFetchingPastas;
        const clickHandler = disabled
            ? null
            : this.removeLastPastaById;
        const tooltipText = disabled
            ? 'Please wait a second'
            : 'Remove this pasta';
        const glyph = disabled
            ? 'hourglass'
            : 'remove'
        return (
            <IconWithTooltip
                id={`remove-pasta-${objectId}`}
                glyph={glyph}
                className={iconClassString}
                tooltipText={tooltipText}
                onClick={clickHandler}
                tabIndex={-1}
                aria-disabled={disabled}
            />
        )
    }

    render() {
        const {
            name,
            encrypted,
            created,
            objectId
        } = this.props;
        const iconClassString = 'pull-right';
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>
                        {formatDate(created)}
                        {this.renderRemoveIcon(iconClassString)}
                        {encrypted && (
                            <IconWithTooltip
                                id={`is-encrypted-${objectId}`}
                                className={iconClassString}
                                glyph="lock"
                                tooltipText="This pasta is encrypted"
                            />
                        )}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body
                    onClick={this.go}
                    className={bem(BLOCK_CLASS, 'last-pasta-body').toString()}
                >
                    <h3 className={bem(BLOCK_CLASS, 'title')}>
                        {name}
                    </h3>
                </Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    isRemovingLastPasta: selectIsRemovingLastPasta(state),
    isFetchingPastas: selectIsFetchingPastas(state)
});

const actionsMap = {push, removeLastPastaById};

export default connect(mapStateToProps, actionsMap)(LastPasta);
