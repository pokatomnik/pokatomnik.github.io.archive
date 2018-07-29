import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { BLOCK_NAME } from './constants';
import bem from '../../utils/bem';
import faqData from './faq-data';
import QAItem from './qa-item/qa-item';


export default class QAItems extends PureComponent {
    static propTypes = {
        selectedIndex: PropTypes.number.isRequired,
        onToggle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(index) {
        this.props.onToggle(index);
    }

    render () {
        const {selectedIndex} = this.props;
        return (
            <div className={bem(BLOCK_NAME, 'questions').toString()}>
                {faqData.map(({question, answer}, index) => (
                    <QAItem
                        key={`${question}:${answer}`}
                        selected={index === selectedIndex}
                        index={index}
                        onToggle={this.handleToggle}
                    >
                        <QAItem.Question>
                            {question}
                        </QAItem.Question>
                        <QAItem.Answer>
                            {answer}
                        </QAItem.Answer>
                    </QAItem>
                ))}
            </div>
        );
    }
}
