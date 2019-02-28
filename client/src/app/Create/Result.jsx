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
import gql from 'graphql-tag';
// import data from './testdata';
import styles from './card-styles.module.scss';
import { SURVEY_URL } from './FormCapture';
import cleanData from './parse-data';

const GET_TYPEFORM_RESPONSE = gql`
  query($email: String!) {
    typeformResponse(email: $email)
  }
`;

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

const Result = ({ loading, userEmail, ...props }) => {
  if (loading) return <div>Loading</div>;
  const data = cleanData(props);
  if (!data) return <div>Not found :(</div>;
  // console.log(d);
  return (
    <React.Fragment>
      <h1>Your card</h1>

      <div className={cx(styles.card)}>
        <div className={cx(styles.cardContainer)}>
          <div className={cx(styles.header)}>
            <div className={cx(styles.upper)}>
              <div className={cx(styles.image)} />
              <Facts data={data} />
            </div>
            <div className={cx(styles.id)}>
              <h2 className={cx(styles.name)}>{data.NAME}</h2>
              <small>
                { data.INSTAGRAM && <span><a rel="noopener noreferrer" target="_blank" href={`/instagram/${data.INSTAGRAM}`}>insta</a></span> }
                { data.GITHUB && <span><a rel="noopener noreferrer" target="_blank" href={`/github/${data.GITHUB}`}>git</a></span> }
              </small>
            </div>
          </div>
          <div className={cx(styles.skills)}>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>{data.ROLE}</p>
            </div>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>??</p>
            </div>
            <div className={cx(styles.skill)}>
              <span className={cx(styles.emoji)} role="img">🔥</span>
              <p className={cx(styles.skilltxt)}>??</p>
            </div>
          </div>

          <div className={cx(styles.chunk)}>
            <Answers data={data} />
          </div>
        </div>
      </div>

      <p className="mt-4 mb-1">Copy html for your card here:</p>
      <textarea
        className="w-100"
        style={{ fontSize: '12px' }}
        readOnly
        value={'<div class="card-styles_card__joViG"><div class="card-styles_cardContainer__OD6hU"><div class=""><div class="card-styles_upper__NMNoo"><div class="card-styles_image__3SMVA"></div><div class="card-styles_facts__2f1eA"><div class="card-styles_fact__cYD4l"><label>Hogwarts House</label><p class="">choice 1</p></div><div class="card-styles_fact__cYD4l"><label>Myers-Briggs</label><p class="">ENFP</p></div><div class="card-styles_fact__cYD4l"><label>Enneagram</label><p class="">3. Achiever</p></div><div class="card-styles_emoji__39g15 card-styles_fact__cYD4l"><label>Favorite Emoji</label><p class="">🙃</p></div></div></div><div class="card-styles_id__29SHW"><h2 class="card-styles_name__3i-ga overflow-ellipsis">Emmy Armintrout</h2><small><span><a href="/instagram/emmyarm">insta</a></span><span><a href="/github/emmya">git</a></span></small></div></div><div class="card-styles_skills__3S6f-"><div class="card-styles_skill__2nH-D"><span class="card-styles_emoji__39g15" role="img">🔥</span><p class="">Engineering</p></div><div class="card-styles_skill__2nH-D"><span class="card-styles_emoji__39g15" role="img">🔥</span><p class="">??</p></div><div class="card-styles_skill__2nH-D"><span class="card-styles_emoji__39g15" role="img">🔥</span><p class="">??</p></div></div><div class="card-styles_chunk__3gW8i d-flex"><div class=""><div class="card-styles_answer__3XrTH"><label>Values</label><p class="">SWEEET</p></div><div class="card-styles_answer__3XrTH"><label>Strengths</label><p class="">Fun, Cool, Sick</p></div><div class="card-styles_answer__3XrTH"><label>Growth areas</label><p class="">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem.  ipsum lorem</p></div><div class="card-styles_answer__3XrTH"><label>Goals</label><p class="">Id like to  ipsum lorem  ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem</p></div></div></div></div></div>'}
      />
    </React.Fragment>
  );
};
export default compose(
  graphql(GET_TYPEFORM_RESPONSE, {
    options: ({ userEmail }) => {
      console.log(userEmail);
      return {
        variables: {
          email: 'emmy 1@resource.io',
        },
      };
    },
    props: ({ data }) => {
      console.log('..');
      return data;
    },
  }),
)(Result);
