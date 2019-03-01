import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, branch, withStateHandlers, withHandlers,
} from 'recompose';
import { graphql } from 'react-apollo';
import Block from 'components/Block';
import Button from 'components/Button';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import Boolean from 'components/Boolean';
import styles from './card-styles.module.scss';
import { SURVEY_URL } from './FormCapture';
import cleanData from './parse-data';
import Card, { CustomizableCard } from './Card';
import { StageEnum } from './index.js';
import { QuestionEnum } from './parse-data';
import CustomizeForm from './CustomizeForm';

const CustomizeCard = (props) => {
  console.log(props);
  return (
    <div className={cx('text-left', 'd-flex', styles.customizeForm)}>
      <CustomizeForm {...props} />
      <CustomizableCard {...props} />
    </div>
  );
};

export default compose(
  withStateHandlers(() => ({
    features: ['ROLE', 'PET', 'NEXT_VACATION'],
    facts: ['ENNEAGRAM', 'MYERS', 'EMOJI', 'HOGWARTS'],
  }), {
    update: ({ features, facts }, _props) => (category, item) => {
      const next = {
        facts: _.difference(facts, [item]),
        features: _.difference(features, [item]),
      };
      const changing = category === 'features' ? features : facts;
      if (features.includes(item) && category !== 'features') {
        return next;
      }
      if (changing.includes(item)) {
        return category === 'features' ? {
          ...next,
          facts: facts.concat([item]),
        } : next;
      }
      if (category === 'features' && features.length >= 3) {
        return {
          ...next,
          features: features.splice(0, 2).concat([item]),
        };
      }
      return {
        ...next,
        [category]: changing.concat([item]),
      };
    },
  }),
)(CustomizeCard);
