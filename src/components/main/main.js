import React from 'react';
import { Route, Switch } from 'react-router';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReduxToastr from 'react-redux-toastr'

import TopMenu from '../top-menu/top-menu';
import bem from '../../utils/bem';
import RouteAbout from '../route-about/route-about';
import RouteRoot from '../route-root/route-root';
import RoutePasta from '../route-pasta/route-pasta';
import RouteFeedback from '../route-feedback/route-feedback';
import ErrorModal from '../error-modal/error-modal';
import ThankYou from '../thank-you/thank-you';
import RouteFAQ from '../route-faq/route-faq';
import RouteConceit from '../route-conceit/router-conceit';
import Route404 from '../route-404/route-404';
import RouteFile from '../route-file/route-file';
import RouteLastPastas from '../route-last-pastas/route-last-pastas';
import RouteRegistration from '../route-registration/route-registration';
import RouteCheckEmail from '../route-check-email/route-check-email';
import RouteResetPassword from '../route-reset-password/route-reset-password';
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
                        <Switch>
                            <Route exact path="/" component={RouteRoot} />
                            <Route exact path="/about" component={RouteAbout} />
                            <Route exact path="/pasta/:data" component={RoutePasta} />
                            <Route exact path="/feedback" component={RouteFeedback} />
                            <Route exact path="/thank-you" component={ThankYou} />
                            <Route exact path="/faq" component={RouteFAQ} />
                            <Route exact path="/conceit" component={RouteConceit} />
                            <Route exact path="/file" component={RouteFile} />
                            <Route exact path="/last-pastas" component={RouteLastPastas} />
                            <Route exact path="/registration" component={RouteRegistration} />
                            <Route exact path="/registration/check-email" component={RouteCheckEmail} />
                            <Route exact path="/reset-password" component={RouteResetPassword} />
                            <Route exact component={Route404} />
                        </Switch>
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

