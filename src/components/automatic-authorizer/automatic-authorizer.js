import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authKey } from '../../constants';
import { base64ToCredentials } from '../../utils/base64';
import { login } from '../../models/user';


class AutomaticAuthorizer extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
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
        return null;
    }
}

const actionsMap = {login};

export default connect(null, actionsMap)(AutomaticAuthorizer);