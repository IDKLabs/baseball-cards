import React from 'react';
import { Router, Route } from 'react-router-dom';

import * as routes from 'constants/routes';
import history from 'constants/history';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import AccountPage from './Account';
import AdminPage from './Admin';
import CreateCard from './Create';
import Team from './Team';
import withSession from './_session/withSession';


import { AdminRoute, PrivateRoute, PublicRoute } from './Route';

const App = props => (
  <Router history={history}>
    <React.Fragment>
      <PrivateRoute
        exact
        path={routes.LANDING}
        component={LandingPage}
        {...props}
      />
      <PublicRoute
        exact
        path={routes.SIGN_UP}
        component={SignUpPage}
        {...props}
      />
      <PublicRoute
        path="/create"
        component={CreateCard}
        {...props}
      />
      <PublicRoute
        path="/team"
        component={Team}
        {...props}
      />
      <PublicRoute
        exact
        path={routes.SIGN_IN}
        component={SignInPage}
        {...props}
      />
      <PrivateRoute
        exact
        path={routes.ACCOUNT}
        component={AccountPage}
        {...props}
      />
      <AdminRoute
        exact
        path={routes.ADMIN}
        component={AdminPage}
        {...props}
      />
    </React.Fragment>
  </Router>
);

export default withSession(App);
