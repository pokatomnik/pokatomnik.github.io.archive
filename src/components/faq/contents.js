import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import bem from '../../utils/bem';
import {BLOCK_NAME} from './constants';
import faqData from './faq-data';
import ContentItem from './content-item';

export default class Contents extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        this.props.onClick(index);
    }

    render() {
        return (
            <div className={bem(BLOCK_NAME, 'contents').toString()}>
                <h1>
                    FAQ
                </h1>
                <ul>
                    {faqData.map(({question, answer}, index) => (
                        <ContentItem
                            key={`${question}:${answer}`}
                            onClick={this.handleClick}
                            index={index}
                        >
                            {question}
                        </ContentItem>
                    ))}
                </ul>
            </div>
        );
    }
}