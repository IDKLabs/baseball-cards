import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, branch, withState, withHandlers,
} from 'recompose';
import { graphql } from 'react-apollo';
import Block from 'components/Block';
import Button from 'components/Button';

function isValidEmail(emailAddress) {
  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}

const Start = ({ onStartClick, email, setEmail }) => (
  <React.Fragment>
    <h1>✨ Create a card</h1>
    <p>You'll fill out a quick survey to create content for your card.</p>
    <p className="mb-1">First, enter your email:</p>
    <input className="mb-4" name="email" onChange={e => setEmail(e.target.value)} value={email} />
    <Button
      disabled={!isValidEmail(email)}
      action
      wide
      onClick={() => onStartClick({ email })}
    >
      Let's get started &nbsp;<i className="small fas fa-external-link-alt" />
    </Button>
  </React.Fragment>
);

export default compose(
  withState('email', 'setEmail', ''),
)(Start);
