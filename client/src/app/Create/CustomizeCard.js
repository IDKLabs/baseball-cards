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
import Card, { CustomizableCard, DEFAULT_FEATURES, DEFAULT_FACTS } from './Card';
import { StageEnum } from './index.js';
import { QuestionEnum } from './parse-data';
import CustomizeForm from './CustomizeForm';

const UPDATE_PREFERENCES = gql`
  mutation($preferences: PreferencesInput!) {
    updatePreferences(preferences: $preferences) {
      id
      preferences {
        features
        facts
      }
    }
  }
`;

const CustomizeCard = ({ features, facts, ...props }) => (
  <div className={cx('text-left', 'd-flex', 'w-100', 'justify-content-around', styles.customizeForm)}>
    <CustomizeForm {...props} {...{ features, facts }} />
    <CustomizableCard {...props} preferences={{ features, facts }} />
  </div>
);

export default compose(
  graphql(UPDATE_PREFERENCES, { name: 'updatePreferencesMutation' }),
  withHandlers({
    updatePreferences: props => async (preferences) => {
      try {
        await props.updatePreferencesMutation({ variables: { preferences } });
      } catch (e) {
        console.error(e);
      }
    },
  }),
  withStateHandlers(({ preferences = {} }) => ({
    features: _.get(preferences, 'features') || DEFAULT_FEATURES,
    facts: _.get(preferences, 'facts') || DEFAULT_FACTS,
  }), {
    update: ({ features, facts }, { updatePreferences }) => (category, item) => {
      let next = {
        facts: _.difference(facts, [item]),
        features: _.difference(features, [item]),
      };

      const changing = category === 'features' ? features : facts;

      if (features.includes(item) && category !== 'features') {
      } else if (changing.includes(item)) {
        next = category === 'features' ? {
          ...next,
          facts: facts.concat([item]),
        } : next;
      } else if (category === 'features' && features.length >= 3) {
        next = {
          ...next,
          features: features.splice(0, 2).concat([item]),
        };
      } else {
        next = {
          ...next,
          [category]: changing.concat([item]),
        };
      }
      updatePreferences(next);
      return next;
    },
  }),
)(CustomizeCard);
