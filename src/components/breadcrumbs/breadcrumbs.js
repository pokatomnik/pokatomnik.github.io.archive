import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import capitalize from 'lodash/capitalize';

import { selectPathName } from '../../models/router';
import Link from '../common/link/link';


class Breadcrumbs extends Component {
    static propTypes = {
        pathName: PropTypes.string.isRequired
    };

    static createHref(currentIndex, pathParts) {
        return `/${
            pathParts
                .filter((pathPart, index) => index && index <= currentIndex)
                .join('/')
        }`;
    }

    renderPathParts() {
        return [
            'home',
            ...this.props.pathName
                .split('/')
                .filter((pathName) => Boolean(pathName))
        ]
            .reduce((result, pathPart, index, pathParts) => {
                const href = Breadcrumbs.createHref(index, pathParts);
                return [...result, (
                    <Link
                        key={href}
                        component={Breadcrumb.Item}
                        to={href}
                        href={`/#!${href}`}
                        active={href === this.props.pathName}
                    >
                        {capitalize(pathPart)}
                    </Link>
                ), ' '];
            }, []);
    }

    render() {
        return (
            <Breadcrumb>
                {this.renderPathParts()}
            </Breadcrumb>
        );
    }
}

const mapStateToProps = (state) => ({
    pathName: selectPathName(state)
});

export default connect(mapStateToProps)(Breadcrumbs);
