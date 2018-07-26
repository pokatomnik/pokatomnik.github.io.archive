import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import omit from 'lodash.omit';


const omitRenderPaths = ['to', 'push', 'beforeGo'];

class Link extends PureComponent {
    static propTypes = {
        to: PropTypes.string,
        component: PropTypes.oneOfType([
            PropTypes.func.isRequired,
            PropTypes.string.isRequired
        ]),
        children: PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
        ]),
        push: PropTypes.func.isRequired,
        beforeGo: PropTypes.func
    };

    static defaultProps = {
        component: 'a',
        beforeGo: () => {}
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const {push, beforeGo, to} = this.props;
        if (!to) {
            return;
        }
        beforeGo();
        push(to);
    }

    render() {
        const {
            component,
            children: text,
            ...restProps
        } = omit(this.props, omitRenderPaths);

        return React.createElement(
            component,
            {onClick: this.handleClick, ...restProps},
            text
        );
    }
}

const actionsMap = {push};

export default connect(null, actionsMap)(Link);
