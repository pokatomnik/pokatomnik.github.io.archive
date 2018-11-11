import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import {
    resetPassword,
    selectIsResettingPassword
} from '../../models/users/users';
import isEmail from '../../utils/is-email';


const BLOCK_NAME = 'reset-password';
const NOT_EMAIL = 'Please specify your actual email';

class ResetPassword extends PureComponent {
    static propTypes = {
        isResettingPassword: PropTypes.bool.isRequired,
        resetPassword: PropTypes.func.isRequired
    };

    static getValidationState(err) {
        if (err) {
            return 'error';
        }
    }

    state = {
        email: '',
        emailError: ''
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const {email} = this.state;
        console.log(email);
        if (!isEmail(email)) {
            this.setState(() => ({
                emailError: NOT_EMAIL
            }));
            return;
        }
        this.props.resetPassword(email);
    };

    handleEmailChange = ({target: {value: email}}) => {
        this.setState(() => ({email, emailError: ''}));
    };

    render() {
        const validationState = ResetPassword.getValidationState(this.state.emailError);
        const {isResettingPassword: disabled} = this.props;
        return (
            <Row className={BLOCK_NAME}>
                <Col md={2} />
                <Col md={4}>
                    <h1>
                        Reset password
                    </h1>
                    <p>
                        Specify the email, please
                    </p>
                </Col>
                <Col md={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            validationState={validationState}
                        >
                            <ControlLabel>
                                Your email
                            </ControlLabel>
                            <FormControl
                                type="text"
                                onChange={this.handleEmailChange}
                                value={this.state.email}
                                placeholder="john.doe@example.com"
                                disabled={disabled}
                             />
                             {this.state.emailError && (
                                <HelpBlock>
                                    {this.state.emailError}
                                </HelpBlock>
                             )}
                        </FormGroup>
                        <ButtonGroup vertical block>
                            <Button
                                bsStyle="success"
                                type="submit"
                                disabled={disabled}
                            >
                                Request password restore
                            </Button>
                        </ButtonGroup>
                    </form>
                </Col>
                <Col md={2} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    isResettingPassword: selectIsResettingPassword(state)
});

const actionsMap = {resetPassword};

export default connect(mapStateToProps, actionsMap)(ResetPassword);

