import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, withState, withHandlers, withProps,
} from 'recompose';
import { withRouter } from 'react-router';
import Block from 'components/Block';
import Button from 'components/Button';
import Start from './Start';
import Result from './Result';
import SignUpToSave from './SignUpToSave';
import { StageEnum } from './index.js';

export const SURVEY_URL = 'https://marcuslowe.typeform.com/to/kDQzo7';

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
  let comp = <p>🧐</p>;

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

  if (stage === StageEnum.SIGN_UP_TO_SAVE) {
    comp = <SignUpToSave {...props} />;
  }

  return (
    <Block style={{ minHeight: '430px' }}>
      {comp}
    </Block>
  );
};

export default compose(
  // withState('stage', 'setStage', StageEnum.SUCCESS),
  withRouter,
  withProps(({ match, history }) => ({
    stage: _.get(match, 'params.stage'),
    setStage: stage => history.push(`/create/${stage}`),
  })),
  withState('userEmail', 'setUserEmail', ''),
  withState('userName', 'setUserName', ''),
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
