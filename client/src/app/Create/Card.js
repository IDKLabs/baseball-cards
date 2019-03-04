import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Block from 'components/Block';
import Button from 'components/Button';
import styles from './card-styles.module.scss';
import { QuestionEnum, PetEmojis } from './parse-data';
import withCardHandlers from './withCardHandlers';

export const DEFAULT_FEATURES = ['ROLE', 'PET', 'NEXT_VACATION'];
export const DEFAULT_FACTS = ['ENNEAGRAM', 'MYERS', 'EMOJI', 'HOGWARTS'];

const getPreferences = ({ preferences }) => ({
  facts: _.get(preferences, 'facts.0') ? preferences.facts : DEFAULT_FACTS,
  features: _.get(preferences, 'features.0') ? preferences.features : DEFAULT_FEATURES,
});

const DynamicFact = ({ data, keyname }) => {
  const question = QuestionEnum[keyname];
  if (!question) {
    return <div />;
  }
  let text = data[keyname];
  if (keyname === 'PET') {
    text = question.emoji(data[keyname]);
  }
  return (<div className={cx(styles.keyname, styles.fact)}>
    <label>{question.label}</label>
    <p className={cx(styles.house)}>{text}</p>
  </div>
  );
};

const DynamicFeature = ({ data, keyname }) => {
  const question = QuestionEnum[keyname];
  if (!question) {
    return <div />;
  }
  let text = data[keyname];
  if (keyname === 'PET') {
    text = `❤️ ${text}`; // PetEmojis[question.value];
  }
  return (
    <div className={cx(styles.skill)}>
      <span className={cx(styles.emoji)} role="img">
        { question.emoji ? question.emoji(data[keyname]) : 'x' }
      </span>
      <p className={cx(styles.skilltxt)}>{text}</p>
    </div>
  );
};

const DynamicFeatures = ({ data, features }) => (
  <div className={cx(styles.skills)}>
    {features.map(keyname => <DynamicFeature key={keyname} {...{ keyname, data }} />)}
  </div>
);

const DynamicFacts = ({ data, facts }) => (
  <div className={cx(styles.facts)}>
    {facts.map(keyname => <DynamicFact key={keyname} {...{ keyname, data }} />)}
  </div>
);

const Facts = ({ data }) => (
  <div className={cx(styles.facts)}>
    { data.HOGWARTS && (
      <div className={cx(styles.hogwarts, styles.fact)}>
        <label>Hogwarts House</label>
        <p className={cx(styles.house)}>{data.HOGWARTS}</p>
      </div>
    )}
    { data.MYERS && (
      <div className={cx(styles.myers, styles.fact)}>
        <label>Myers-Briggs</label>
        <p className={cx(styles.house)}>{data.MYERS}</p>
      </div>
    )}
    { data.ENNEAGRAM && (
      <div className={cx(styles.enneagram, styles.fact)}>
        <label>Enneagram</label>
        <p className={cx(styles.house)}>{data.ENNEAGRAM}</p>
      </div>
    )}
    { data.EMOJI && (
      <div className={cx(styles.emoji, styles.fact)}>
        <label>Favorite Emoji</label>
        <p className={cx(styles.house)}>{data.EMOJI}</p>
      </div>
    )}
  </div>
);

const Answers = ({ data }) => (
  <div className={cx(styles.answers)}>
    { data.VALUES && (
    <div className={cx(styles.strengths, styles.answer)}>
      <label>Values</label>
      <p className={cx(styles.house)}>{data.VALUES}</p>
    </div>
    )}

    { data.STRENGTHS && (
    <div className={cx(styles.strengths, styles.answer)}>
      <label>Strengths</label>
      <p className={cx(styles.house)}>{data.STRENGTHS}</p>
    </div>
    )}

    { data.GROWTH_AREAS && (
    <div className={cx(styles.weaknesses, styles.answer)}>
      <label>Growth areas</label>
      <p className={cx(styles.house)}>{data.GROWTH_AREAS}</p>
    </div>
    )}

    { data.GOALS && (
    <div className={cx(styles.goals, styles.answer)}>
      <label>Goals</label>
      <p className={cx(styles.house)}>{data.GOALS}</p>
    </div>
    )}
  </div>
);

const Social = ({ data }) => (
  <small>
    { data.INSTAGRAM && <span><a rel="noopener noreferrer" target="_blank" href={`/instagram/${data.INSTAGRAM}`}>insta</a></span> }
    { data.GITHUB && <span><a rel="noopener noreferrer" target="_blank" href={`/github/${data.GITHUB}`}>git</a></span> }
  </small>
);

const Skills = ({ data }) => (
  <div className={cx(styles.skills)}>
    <div className={cx(styles.skill)}>
      <span className={cx(styles.emoji)} role="img">🔥</span>
      <p className={cx(styles.skilltxt)}>{data.ROLE}</p>
    </div>
    <div className={cx(styles.skill)}>
      <span className={cx(styles.emoji)} role="img">🐶</span>
      <p className={cx(styles.skilltxt)}>❤️ {data.PET}</p>
    </div>
    <div className={cx(styles.skill)}>
      <span className={cx(styles.emoji)} role="img">🏝</span>
      <p className={cx(styles.skilltxt)}>{data.NEXT_VACATION}</p>
    </div>
  </div>
);

export default ({ data }) => (
  <div className={cx(styles.card)}>
    <div className={cx(styles.cardContainer)}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.upper)}>
          <div className={cx(styles.image)} style={{ backgroundImage: `url(${data.PHOTO})` }}>🙂</div>
          <Facts data={data} />
        </div>
        <div className={cx(styles.id)}>
          <h2 className={cx(styles.name)}>{data.NAME}</h2>
          <Social data={data} />
        </div>
      </div>
      <Skills data={data} />
      <div className={cx(styles.chunk)}>
        <Answers data={data} />
      </div>
    </div>
  </div>
);

export const CustomizableCard = ({ data, preferences }) => {
  const { facts, features } = getPreferences({ preferences });

  return (
    <div className={cx(styles.card)}>
      <div className={cx(styles.cardContainer)}>
        <div className={cx(styles.header)}>
          <div className={cx(styles.upper)}>
            <div className={cx(styles.image)} style={{ backgroundImage: `url(${data.PHOTO})` }}>🙂</div>
            <DynamicFacts data={data} facts={facts} />
          </div>
          <div className={cx(styles.id)}>
            <h2 className={cx(styles.name)}>{data.NAME}</h2>
            <Social data={data} />
          </div>
        </div>
        <DynamicFeatures data={data} features={features} />
        <div className={cx(styles.chunk)}>
          <Answers data={data} />
        </div>
      </div>
    </div>
  );
};

export const CustomizableCardWithHandlers = withCardHandlers(CustomizableCard);

export const CardPreview = ({ data, preferences }) => {
  const { facts, features } = getPreferences({ preferences });
  return (
    <div className={cx(styles.card, styles.miniCard)}>
      <div className={cx(styles.cardContainer)}>
        <div className={cx(styles.miniHeader)}>
          <div className={cx(styles.image)} />
          <h2 className={cx(styles.name)}>{data.NAME}</h2>
        </div>
        <DynamicFeatures data={data} features={features} />
      </div>
    </div>
  );
};
