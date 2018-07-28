import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

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
            key: '',
            helpText: ''
        };

        this.handleKeyInput = this.handleKeyInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate({encryptedText: oldEncryptedText}) {
        if (oldEncryptedText !== this.props.encryptedText) {
            this.setState({helpText: ''});
        }
    }

    handleKeyInput({target: {value: key}}) {
        this.setState({
            key,
            helpText: this.state.helpText ? '' : this.state.helpText
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const {
            onDecrypt,
            encryptedText
        } = this.props;
        if (!this.state.key) {
            return this.setState({
                helpText: 'Encryption key must not be empty'
            });
        }
        onDecrypt(decrypt(encryptedText, this.state.key));
    }

    render() {
        return (
            <Row>
                <Col md={4} />
                <Col md={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FuckAutocomplete type="password" />
                        <FormGroup>
                            <ControlLabel>
                                This pasta is encrypted.
                            </ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="password"
                                    placeholder="Pasta key"
                                    onChange={this.handleKeyInput}
                                />
                                <InputGroup.Button>
                                    <Button
                                        type="submit"
                                        bsStyle="danger"
                                    >
                                        Decrypt
                                    </Button>
                                </InputGroup.Button>
                            </InputGroup>
                            {this.state.helpText && (
                                <HelpBlock>
                                    {this.state.helpText}
                                </HelpBlock>
                            )}
                        </FormGroup>
                    </form>
                </Col>
                <Col md={4} />
            </Row>
        );
    }
}