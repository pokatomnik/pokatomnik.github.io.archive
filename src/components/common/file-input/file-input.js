import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import readFile from '../../../utils/read-file';
import bem from '../../../utils/bem';
import './file-input.css';


const BLOCK_NAME = 'file-input';
const ON_READ_ERROR_KEY = 'onReadError';
const omitPaths = [ON_READ_ERROR_KEY];
const NO_FILE_SELECTED = 'ADD📎FILES';

export default class FileInput extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        [ON_READ_ERROR_KEY]: PropTypes.func
    };

    static defaultProps = {
        onChange: () => {},
        [ON_READ_ERROR_KEY]: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            fileName: ''
        };

        this.mounted = false;

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(evt) {
        readFile(evt.target.files[0])
            .then((file) => {
                this.mounted && this.setState({fileName: file.name});
                this.props.onChange(file);
            })
            .catch(this.props[ON_READ_ERROR_KEY]);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <label className={BLOCK_NAME}>
                <span className={bem(BLOCK_NAME, 'name')}>
                    {this.state.fileName ? this.state.fileName : NO_FILE_SELECTED}
                </span>
                <input
                    {...omit(this.props, omitPaths)}
                    type="file"
                    onChange={this.handleFileChange}
                    className={bem(BLOCK_NAME, 'input')}
                />
            </label>
        );
    }
}