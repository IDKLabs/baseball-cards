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
import Start from './Start';

const StageEnum = Object.freeze({
  START: 'START',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
});

const Awaiting = ({ onAwaitCancel }) => (
  <React.Fragment>
    <p><i className="fas fa-circle-notch fa-spin text-muted" /> Waiting on form...</p>
    <Button link onClick={onAwaitCancel}>Cancel</Button>
  </React.Fragment>
);

const FormCapture = ({ stage, ...props }) => {
  console.log('FORMCAP');
  console.log(props);
  let comp;
  if (stage === StageEnum.START) {
    comp = <Start {...props} />;
  }

  if (stage === StageEnum.AWAITING_RESPONSE) {
    comp = <Awaiting {...props} />;
  }

  return (
    <Block style={{ minHeight: '430px' }}>
      {comp}
    </Block>
  );
};

export default compose(
  withState('stage', 'setStage', StageEnum.START),
  withHandlers({
    onStartClick: props => ({ email }) => {
      const {
        setStage,
      } = props;
      window.open(`https://marcuslowe.typeform.com/to/kDQzo7?source=site&email=${email}`);
      setStage(StageEnum.AWAITING_RESPONSE);
    },
    onAwaitCancel: props => () => {
      const {
        setStage,
      } = props;
      setStage(StageEnum.START);
    },
  }),
)(FormCapture);
