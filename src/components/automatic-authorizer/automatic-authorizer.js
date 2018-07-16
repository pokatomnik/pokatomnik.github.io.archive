import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authKey } from '../../constants';
import { base64ToCredentials } from '../../utils/base64';
import {
    login,
    selectUserLoggingIn
} from '../../models/user';
import LoggingScreen from './logging-screen';
import bem from '../../utils/bem';
import './automatic-authorizer.css';


export const BLOCK_NAME = 'automatic-authorizer';

class AutomaticAuthorizer extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
        ]).isRequired,
        userLoggingIn: PropTypes.bool.isRequired
    };

    componentDidMount() {
        const rawCredentials = localStorage.getItem(authKey);
        if (!rawCredentials) {
            return;
        }
        const {email, password} = base64ToCredentials(rawCredentials);
        this.props.login(email, password, true);
    }

    render() {
        const {
            userLoggingIn,
            children
        } = this.props;
        return (
            <div className={BLOCK_NAME}>
                <LoggingScreen visible={userLoggingIn} />
                <div className={bem(BLOCK_NAME, 'content', {hidden: userLoggingIn}).toString()}>
                    {children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userLoggingIn: selectUserLoggingIn(state)
});

const actionsMap = {login};

export default connect(mapStateToProps, actionsMap)(AutomaticAuthorizer);