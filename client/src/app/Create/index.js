import React from 'react';
import { compose } from 'recompose';
import { Redirect, Route, Switch } from 'react-router';
// import Create1 from './Create1';
import FormCapture from './FormCapture';


const Page = ({ templatesEnabled }) => (
  <Switch>
    <Route exact path="/create">
      <Redirect to="/create/start" />
    </Route>
    <Route exact path="/create/start" component={FormCapture} />
    <Route exact path="/create/finish" component={FormCapture} />
  </Switch>
);

export default Page;
