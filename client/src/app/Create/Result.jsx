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
import data from './testdata';
import styles from './card-styles.module.scss';

const cleanData = (_data) => {
  const string = JSON.stringify(data);
  const obj = JSON.parse(string);
  return obj;
};

const Facts = _props => (
  <div className={cx(styles.facts)}>
    <div className={cx(styles.hogwarts, styles.fact)}>
      <label>Hogwarts House</label>
      <p className={cx(styles.house)}>Gryffindor</p>
    </div>
    <div className={cx(styles.myers, styles.fact)}>
      <label>Myers-Briggs</label>
      <p className={cx(styles.house)}>ENFP</p>
    </div>
    <div className={cx(styles.enneagram, styles.fact)}>
      <label>Enneagram</label>
      <p className={cx(styles.house)}>Achiever (3)</p>
    </div>
    <div className={cx(styles.emoji, styles.fact)}>
      <label>Favorite Emoji</label>
      <p className={cx(styles.house)}>🙂</p>
    </div>
  </div>
);

const Result = (props) => {
  console.log(cleanData());

  return (
    <React.Fragment>
      <h1>Your card</h1>

      <div className={cx(styles.card)}>
        <div className={cx(styles.cardContainer)}>
          <div className={cx(styles.header)}>
            <div>
              <div className={cx(styles.image)} />
              <h2 className={cx(styles.name)}>Emmy Armintrout</h2>
            </div>

            <Facts {...props} />
          </div>
          <div className={cx(styles.skills)}>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>Engineering</p>
            </div>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>Engineering</p>
            </div>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>Engineering</p>
            </div>
          </div>

          <div className={cx(styles.chunk, 'd-flex')}>
            <div className={cx(styles.answers)}>
              <div className={cx(styles.strengths, styles.answer)}>
                <label>Stengths</label>
                <p className={cx(styles.house)}>Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem.</p>
              </div>

              <div className={cx(styles.weaknesses, styles.answer)}>
                <label>Weaknesses</label>
                <p className={cx(styles.house)}>Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem.</p>
              </div>

              <div className={cx(styles.goals, styles.answer)}>
                <label>Goals</label>
                <p className={cx(styles.house)}>Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem. Lorem ipsum. Lorem ipsum lorem lorem.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default compose(
  withState('email', 'setEmail', ''),
)(Result);
