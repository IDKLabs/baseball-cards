import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose, branch } from 'recompose';
import { SignUpForm } from '../SignUp';

const SignUpToSave = ({ userEmail, userName, ...props }) => {
  console.log(props);
  const { history, refetch } = props;
  if (!history || !refetch) {
    console.log('ERROR');
  }
  return (
    <React.Fragment>
      <h3>Choose a password to save your card</h3>

      <SignUpForm {...{ history, refetch }} email={userEmail} fullName={userName} cta="Save card" />
    </React.Fragment>
  );
};

export default SignUpToSave;
