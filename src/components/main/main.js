import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReduxToastr from 'react-redux-toastr'

import TopMenu from '../top-menu/top-menu';
import bem from '../../utils/bem';
import RouteAbout from '../route-about/route-about';
import RouteRoot from '../route-root/route-root';
import RoutePasta from '../route-pasta/route-pasta';
import ErrorModal from '../error-modal/error-modal';
import './toastr-fixes.css';


const BLOCK_CLASS = 'main';

export default function Main() {
    return (
        <div className={bem(BLOCK_CLASS)}>
            <TopMenu />
            <div className="container">
                <Row>
                    <Col md={1} />
                    <Col md={10}>
                        <Route exact path="/" component={RouteRoot} />
                        <Route exact path="/profile" component={null} />
                        <Route exact path="/about" component={RouteAbout} />
                        <Switch>
                            <Redirect exact from="/pasta" to="/"/>
                        </Switch>
                        <Route exact path="/pasta/:data" component={RoutePasta} />
                    </Col>
                    <Col md={1} />
                </Row>
            </div>
            <ErrorModal />
            <ReduxToastr
                timeOut={4000}
                newestOnTop
                preventDuplicates={false}
                position="bottom-right"
                transitionIn="bounceInDown"
                transitionOut="bounceOutUp"
            />
        </div>
    );
}

