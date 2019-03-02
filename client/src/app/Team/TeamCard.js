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
import parseData from './parse-data';
import { CustomizableCardWithHandlers, CardPreview } from '../Create/Card';
import styles from './team.module.scss';

const TeamCard = (props) => {
  const {
    data,
    userEmail,
    setPopupData,
    popupData,
  } = props;

  console.log(props);
  return (
    <div className={cx(styles.cardWrap)} onClick={() => setPopupData(userEmail)}>
      <CardPreview {...{ data, userEmail }} />
      <Popup hidden={popupData !== userEmail} close={() => setPopupData(null)}>
        <CustomizableCardWithHandlers {...{
          data, userEmail,
        }}
        />
      </Popup>
    </div>
  );
};

export default TeamCard;
