import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import omit from 'lodash.omit';


const omitRenderPaths = ['to', 'push', 'beforeGo'];

class Link extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const {push, beforeGo} = this.props;
        beforeGo();
        push(this.props.to);
    }

    render() {
        const {
            component: Component,
            children: text,
            ...restProps
        } = omit(this.props, omitRenderPaths);

        return React.createElement(
            Component,
            {onClick: this.handleClick, ...restProps},
            text
        );
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.string.isRequired
    ]).isRequired,
    children: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    beforeGo: PropTypes.func
};

Link.defaultProps = {
    beforeGo: () => {}
};

const actionsMap = {push};

export default connect(null, actionsMap)(Link);
