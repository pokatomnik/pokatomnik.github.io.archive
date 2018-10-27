import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    retrieveCurrentUser,
    selectIsUserLoggedIn
} from '../../models/users';
import UserMenu from './user-menu';
import LoginForm from './login-form';

class User extends PureComponent {
    static propTypes = {
        isUserLoggedIn: PropTypes.bool.isRequired,
        retrieveCurrentUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {isUserLoggedIn, retrieveCurrentUser} = this.props;
        if (!isUserLoggedIn) {
            retrieveCurrentUser();
        }
    }
    
    render() {
        const {isUserLoggedIn} = this.props;
        return (
            <React.Fragment>
                {!isUserLoggedIn && (
                    <LoginForm />
                )}
                {isUserLoggedIn && (
                    <UserMenu />
                )}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isUserLoggedIn: selectIsUserLoggedIn(state)
});

const actionsMap = {retrieveCurrentUser};

export default connect(mapStateToProps, actionsMap)(User);
