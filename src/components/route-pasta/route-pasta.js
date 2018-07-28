import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {urlToData} from '../../utils/create-url';
import Pasta from '../pasta/pasta';
import {setError} from '../../models/error';

const BLOCK_NAME = 'route-pasta';

class RoutePasta extends PureComponent {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                data: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        setError: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    };

    static handleNewProps(context, props) {
        urlToData(RoutePasta.getData(props))
            .then(({name, text, encrypted}) => {
                context.setState({
                    name,
                    text,
                    encrypted
                });
            })
            .catch(() => {
                context.props.push('/');
                context.props.setError(
                    'Broken link',
                    'This link is broken, so Pasta cannot read It.'
                );
            });
    }

    static getData({
        match: {
            params: {data}
        }
    }) {
        return data;
    }

    static isDataChanged(oldProps, newProps) {
        return RoutePasta.getData(oldProps) !== RoutePasta.getData(newProps);
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            encrypted: false
        };
    }

    componentDidMount() {
        RoutePasta.handleNewProps(this, this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (RoutePasta.isDataChanged(this.props, nextProps)) {
            RoutePasta.handleNewProps(this, nextProps);
        }
    }

    render() {
        const {
            name,
            text,
            encrypted
        } = this.state;

        return (
            <div className={BLOCK_NAME}>
                <Pasta
                    name={name}
                    text={text}
                    encrypted={encrypted}
                />
            </div>
        );
    }
}

const actionsMap = {
    push,
    setError
};

export default connect(null, actionsMap)(RoutePasta);