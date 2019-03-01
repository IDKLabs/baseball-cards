import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router';
import cx from 'classnames';
import {
  compose, branch, withState, withHandlers,
} from 'recompose';
import { graphql } from 'react-apollo';
import Block from 'components/Block';
import Button from 'components/Button';
import gql from 'graphql-tag';
import parseData from './parse-data';

const GET_TYPEFORM_RESPONSES = gql`
  query {
    responses
  }
`;


const Team = ({ loading, ...props }) => {
  console.log(props);
  if (loading) {
    return <p>Loading</p>;
  }
  const data = parseData(props);
  return (
    <div>
      {JSON.stringify(props)}
    </div>
  );
};

export default compose(
  graphql(GET_TYPEFORM_RESPONSES, {
    props: ({ data }) => {
      console.log(data);
      return data;
    },
  }),
  withRouter,
)(Team);
