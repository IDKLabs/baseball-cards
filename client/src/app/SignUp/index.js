import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import cx from 'classnames';
import * as routes from 'constants/routes';
import ErrorMessage from 'components/Error';
import Button from 'components/Button';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpPage = ({ history, refetch }) => (
  <div className={cx('bg-white', 'text-center', 'p-4')} style={{ maxWidth: '500px', margin: '0 auto' }}>
    <h1><span role="img">✨</span></h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

class SignUpForm extends Component {
  state = {
    ...INITIAL_STATE,
    email: this.props.email || '',
    username: this.props.fullName || '',
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signUp.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    const isInvalid = password !== passwordConfirmation
      || password === ''
      || email === ''
      || username === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ username, email, password }}
      >
        {(signUp, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signUp)}>
            <input
              className="w-100 mb-3"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              className="w-100 mb-3"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              className="w-100 mb-3"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <input
              className="w-100 mb-3"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <Button type="submit" disabled={isInvalid || loading} action wide className="mt-3">
              { this.props.cta || 'Sign Up' }
            </Button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have a baseball card yet? <Link to={routes.CREATE}>Create one</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
