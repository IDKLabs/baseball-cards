import React from 'react';
import { compose } from 'recompose';
import { Redirect, Route, Switch } from 'react-router';
import FormCapture from './FormCapture';

export const StageEnum = Object.freeze({
  START: 'start',
  AWAITING_RESPONSE: 'waiting',
  SUCCESS: 'finish',
  SIGN_UP_TO_SAVE: 'save',
});

const Page = () => (
  <Switch>
    <Route exact path="/create/:stage" component={FormCapture} />
    <Route exact path="/create">
      <Redirect to={`/create/${StageEnum.START}`} />
    </Route>
  </Switch>
);

export default Page;
