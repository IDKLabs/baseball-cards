import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, withState, withHandlers,
} from 'recompose';
import Block from 'components/Block';
import Button from 'components/Button';
import Start from './Start';
import Result from './Result';

export const SURVEY_URL = 'https://marcuslowe.typeform.com/to/kDQzo7';

const StageEnum = Object.freeze({
  START: 'START',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
});

const Awaiting = ({ onAwaitCancel, onAwaitContinue, onStartClick }) => (
  <React.Fragment>
    <p><i className="fas fa-circle-notch fa-spin text-muted" /> Waiting on questionnaire...</p>

    <p>Be sure to finish the questionnaire before continuing. Need to start over?
      <a style={{ cursor: 'pointer' }} onClick={onStartClick}> Click here</a>
    </p>
    <div className={cx('d-flex')}>
      <Button link onClick={onAwaitCancel}>Cancel</Button>
      &nbsp;
      <Button action onClick={onAwaitContinue}>I'm done</Button>
    </div>
  </React.Fragment>
);

const FormCapture = ({ stage, ...props }) => {
  let comp;
  if (stage === StageEnum.START) {
    comp = <Start {...props} />;
  }

  if (stage === StageEnum.AWAITING_RESPONSE) {
    // if (!props.userEmail) {
    //   props.setStage(StageEnum.START);
    // }
    comp = <Awaiting {...props} />;
  }

  if (stage === StageEnum.SUCCESS) {
    // if (!props.userEmail) {
    //   props.setStage(StageEnum.START);
    // }
    comp = <Result {...props} />;
  }

  return (
    <Block style={{ minHeight: '430px' }}>
      {comp}
    </Block>
  );
};

export default compose(
  withState('stage', 'setStage', StageEnum.SUCCESS),
  withState('userEmail', 'setUserEmail', ''),
  withHandlers({
    onStartClick: props => ({ email: newEmail }) => {
      const {
        setStage,
        setUserEmail,
        userEmail,
      } = props;
      const email = newEmail || userEmail;
      if (!email) {
        setStage(StageEnum.START);
      } else {
        window.open(`${SURVEY_URL}?source=site&email=${email}`);
        setUserEmail(email);
        setStage(StageEnum.AWAITING_RESPONSE);
      }
    },
    onAwaitCancel: props => () => {
      const {
        setStage,
      } = props;
      setStage(StageEnum.START);
    },
    onAwaitContinue: props => () => {
      const {
        setStage,
      } = props;
      setStage(StageEnum.SUCCESS);
    },
  }),
)(FormCapture);
