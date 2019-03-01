import React from 'react';
import { compose } from 'recompose';
import { Redirect, Route, Switch } from 'react-router';
// import Create1 from './Create1';
import Team from './Team';

const NoTeam = () => <p>Not sure what team you're looking for :(</p>;


const Page = props => (
  <Switch>
    <Route exact path="/team/:domain" component={() => <Team {...props} />} />
    <Route exact path="/team" component={NoTeam} />
  </Switch>
);

export default Page;
