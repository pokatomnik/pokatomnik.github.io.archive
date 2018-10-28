import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        encrypted: PropTypes.bool.isRequired,
        created: PropTypes.number.isRequired,
        push: PropTypes.func.isRequired
    };

    go = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.push(this.props.url);
    }

    render() {
        const {
            name,
            encrypted,
            created
        } = this.props;
        const iconClassString = bem(BLOCK_CLASS, 'icon').addClasses('pull-right').toString();
        return (
            <Panel onClick={this.go} className={BLOCK_CLASS}>
                <Panel.Heading>
                    <Panel.Title>
                        {formatDate(created)}
                        {encrypted && (
                            // TODO: make a hint here (popover maybe?)
                            <Glyphicon
                                className={iconClassString}
                                glyph="glyphicon glyphicon-lock"
                            />
                        )}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <h3 className={bem(BLOCK_CLASS, 'title')}>
                        {name}
                    </h3>
                </Panel.Body>
            </Panel>
        );
    }
}

const actionsMap = {push};

export default connect(null, actionsMap)(LastPasta);
