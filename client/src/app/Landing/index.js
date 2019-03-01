import React from 'react';
// import { MessageCreate, Messages } from 'components/Message';
import Block from 'components/Block';
import Button from 'components/Button';
import Result from '../Create/Result';

const Landing = ({ session }) => (
  <Block>
    <Result userEmail={session.me.email} />

    <Button className="mt-4" action to={`/team/${session.me.email.split('@')[1]}`}>View team cards</Button>
  </Block>
);

export default Landing;
