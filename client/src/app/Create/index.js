import React from 'react';
import { compose } from 'recompose';
import { Redirect, Route, Switch } from 'react-router';
// import Create1 from './Create1';
import FormCapture from './FormCapture';

const Page = () => (
  <Switch>
    <Route exact path="/create/:step" component={FormCapture} />
    <Route exact path="/create">
      <Redirect to="/create/start" />
    </Route>
  </Switch>
);

export default Page;
