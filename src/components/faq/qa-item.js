import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';


export default class QAItem extends PureComponent {
    static propTypes = {
        selected: PropTypes.bool.isRequired,
        question: PropTypes.node.isRequired,
        answer: PropTypes.node.isRequired,
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
        return (
            <div ref={this.saveRef}>
                <Panel
                    expanded={this.props.selected}
                    onToggle={this.onToggle}
                >
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <strong>Q:</strong> {this.props.question}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <strong>A:</strong> {this.props.answer}
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        );
    }
}