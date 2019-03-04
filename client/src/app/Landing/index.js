import React from 'react';
import {
  compose, branch, withState, withHandlers, withProps,
} from 'recompose';
import Block from 'components/Block';
import Button from 'components/Button';
import CustomizeCard from '../Create/CustomizeCard';
import withCardHandlers from '../Create/withCardHandlers';

const Landing = props => (
  <Block style={{ maxWidth: '900px' }}>
    <CustomizeCard {...props} />

    <Button className="mt-4" action to={`/team/${props.session.me.email.split('@')[1]}`}>View team cards</Button>
  </Block>
);

export default compose(
  withProps(({ session }) => ({
    userEmail: session.me.email,
    preferences: session.me.preferences,
  })),
  withCardHandlers,
)(Landing);
