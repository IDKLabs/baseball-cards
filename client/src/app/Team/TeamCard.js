import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  compose, withState,
} from 'recompose';
import { graphql } from 'react-apollo';
import Block from 'components/Block';
import Button from 'components/Button';
import Popup from 'components/Popup';
import Loading from 'components/Loading';
import gql from 'graphql-tag';
import parseData from './parse-team-data';
import { CustomizableCard, CardPreview } from '../Create/Card';
import withCardHandlers from '../Create/withCardHandlers';
import styles from './team.module.scss';

const TeamCard = withCardHandlers((props) => {
  const {
    data,
    userEmail,
    setPopupData,
    popupData,
    preferences,
  } = props;

  return (
    <React.Fragment>
      <div className={cx(styles.previewWrap)}>
        <CardPreview {...{ data, userEmail, preferences }} />
      </div>
      <Popup size="sm" hidden={popupData !== userEmail} close={() => setPopupData(null)}>
        <div className="d-flex justify-content-center">
          <CustomizableCard {...{
            data, userEmail, preferences,
          }}
          />
        </div>
      </Popup>
    </React.Fragment>
  );
});

export default (props) => {
  const {
    userEmail,
    setPopupData,
  } = props;
  return (
    <div className={cx(styles.cardWrap)} onClick={() => setPopupData(userEmail)}>
      <TeamCard {...props} />
    </div>
  );
};
