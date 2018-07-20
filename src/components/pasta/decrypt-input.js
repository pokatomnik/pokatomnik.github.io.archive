import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import { decrypt } from '../../utils/encryption';
import FuckAutocomplete from '../common/fuck-autocomplete/fuck-autocomplete';


export default class DecryptInput extends PureComponent {
    static propTypes = {
        encryptedText: PropTypes.string,
        onDecrypt: PropTypes.func.isRequired
    };

    static defaultProps = {
        encryptedText: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            key: ''
        };

        this.handleKeyInput = this.handleKeyInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyInput({target: {value: key}}) {
        this.setState({key});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const {
            onDecrypt,
            encryptedText
        } = this.props;
        onDecrypt(decrypt(encryptedText, this.state.key));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FuckAutocomplete type="password" />
                <FormGroup>
                    <ControlLabel>
                        This pasta is encrypted.
                    </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="password"
                            placeholder="Type this pasta encryption key here"
                            onChange={this.handleKeyInput}
                        />
                        <InputGroup.Button>
                            <Button type="submit">
                                Decrypt
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }
}