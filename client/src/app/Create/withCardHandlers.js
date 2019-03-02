import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, branch, withState, withHandlers, withProps,
} from 'recompose';
import { graphql } from 'react-apollo';
import Block from 'components/Block';
import Button from 'components/Button';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import styles from './card-styles.module.scss';
import { SURVEY_URL } from './FormCapture';
import cleanData from './parse-data';
import Card from './Card';
import CustomizeCard from './CustomizeCard';
import { StageEnum } from './index.js';

const GET_PREFERENCES = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      email
      preferences {
        features
        facts
      }
    }
  }
`;

const GET_TYPEFORM_RESPONSE = gql`
  query($email: String!) {
    typeformResponse(email: $email)
  }
`;

export default WrappedElement => compose(
  graphql(GET_PREFERENCES, {
    options: ({ userEmail }) => ({
      skip: ({ userEmail }) => !userEmail,
      variables: {
        email: userEmail,
      },
    }),
    props: ({ data }) => {
      console.log('GET_PREFERENCES');
      console.log(data);
      return {
        preferences: _.get(data, 'userByEmail.preferences'),
      };
    },
  }),
  graphql(GET_TYPEFORM_RESPONSE, {
    skip: ({ userEmail, data }) => !userEmail || _.get(data, 'NAME'),
    options: ({ userEmail }) => {
      console.log(userEmail);
      return {
        variables: {
          email: userEmail,
        },
      };
    },
    props: ({ data }) => {
      console.log('..');
      return data;
    },
  }),
  branch(({ loading }) => loading, () => Loading),
  withProps(props => ({
    data: cleanData(props),
  })),
  branch(({ data }) => !data, () => () => <div>Not found :(</div>),
)(WrappedElement);
