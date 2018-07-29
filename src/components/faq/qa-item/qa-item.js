import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash.find';
import Panel from 'react-bootstrap/lib/Panel';

import Question from './question';
import Answer from './answer';


export default class QAItem extends PureComponent {
    static Answer = Answer;
    static Question = Question;

    static propTypes = {
        selected: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
        index: PropTypes.number.isRequired,
        onToggle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.ref = null;

        this.saveRef = this.saveRef.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidUpdate({selected: oldSelected}) {
        if (this.ref && !oldSelected && this.props.selected) {
            this.ref.scrollIntoView();
        }
    }

    onToggle() {
        const {onToggle, index} = this.props;
        onToggle(index);
    }

    saveRef(ref) {
        this.ref = ref;
    }

    render() {
        const children = React.Children.toArray(this.props.children);
        const answer = find(children, (child) => child.type === QAItem.Answer);
        const question = find(children, (child) => child.type === QAItem.Question);

        if (!answer && !question) {
            return null;
        }

        return (
            <div ref={this.saveRef}>
                <Panel
                    expanded={this.props.selected}
                    onToggle={this.onToggle}
                >
                    {question && question}
                    <Panel.Collapse>
                        {answer && answer}
                    </Panel.Collapse>
                </Panel>
            </div>
        );
    }
}