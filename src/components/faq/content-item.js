import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class ContentItem extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const {index, onClick} = this.props;
        onClick(index);
    }

    render() {
        return (
            <li>
                <a onClick={this.handleClick}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}