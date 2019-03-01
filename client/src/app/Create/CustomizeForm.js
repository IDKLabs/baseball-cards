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
import Card from './Card';
import { StageEnum } from './index.js';
import { QuestionEnum } from './parse-data';

const customizable = [
  'ROLE',
  'ENNEAGRAM',
  'MYERS',
  'EMOJI',
  'HOGWARTS',
  'PET',
  'FAVORITE_BOOK',
  'FAVORITE_BOARD_GAME',
  'NEXT_VACATION',
  'FAVORITE_TV_SHOW',
];

const featurable = [
  'ROLE',
  'ENNEAGRAM',
  'MYERS',
  'HOGWARTS',
  'PET',
  'FAVORITE_BOOK',
  'FAVORITE_BOARD_GAME',
  'NEXT_VACATION',
  'FAVORITE_TV_SHOW',
];

export default ({
  update, features, facts, ...props
}) => {
  const onChangeFn = (category, item) => (e) => {
    console.log(e);
    update(category, item);
  };
  return (
    <div className={cx('text-left', 'small', styles.customizeForm)}>
      { customizable.map((item) => {
        const label = QuestionEnum[item].label;
        return (
          <div className={cx('mt-3')}>
            <p className={cx('mb-1')}><b>
              <Boolean
                onChange={onChangeFn('facts', item)}
                label={label}
                id="facts"
                toggle
                value={facts.includes(item) || features.includes(item)}
              />
            </b>
            </p>
            { featurable.includes(item) && (
              <span className="text-muted">
                <Boolean
                  onChange={onChangeFn('features', item)}
                  label="Featured"
                  id="features"
                  type="checkbox"
                  value={features.includes(item)}
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// export default compose(
//   withStateHandlers(() => ({
//     features: ['ROLE', 'PET', 'NEXT_VACATION'],
//     facts: ['ENNEAGRAM', 'MYERS', 'EMOJI', 'HOGWARTS'],
//   }), {
//     update: ({ features, facts }, _props) => (category, item) => {
//       const next = {
//         facts: _.difference(facts, [item]),
//         features: _.difference(features, [item]),
//       };
//       const changing = category === 'features' ? features : facts;
//       if (features.includes(item) && category !== 'features') {
//         console.log('yep');
//         return next;
//       }
//       if (changing.includes(item)) {
//         return category === 'features' ? {
//           ...next,
//           facts: facts.concat([item]),
//         } : next;
//       }
//       return {
//         ...next,
//         [category]: changing.concat([item]),
//       };
//     },
//   }),
// )(Result);
