import React, { PureComponent } from 'react';

import Contents from './contents';
import QAItems from './qa-items';
import {BLOCK_NAME} from './constants';

export default class FAQ extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
        };

        this.handleSelectQuestion = this.handleSelectQuestion.bind(this);
    }

    handleSelectQuestion(selectedIndex) {
        this.setState({selectedIndex});
    }

    render() {
        return (
            <div className={BLOCK_NAME}>
                <Contents onClick={this.handleSelectQuestion} />
                <hr />
                <QAItems
                    selectedIndex={this.state.selectedIndex}
                    onToggle={this.handleSelectQuestion}
                />
            </div>
        );
    }
}