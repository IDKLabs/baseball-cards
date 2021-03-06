import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  compose, branch, withState, withHandlers,
} from 'recompose';
import Block from 'components/Block';
import Button from 'components/Button';
import styles from './card-styles.module.scss';
import Card from './Card';
import { StageEnum } from './index.js';
import withCardHandlers from './withCardHandlers';

const Result = ({
  data, setStage, setUserName, userName, ...props
}) => {
  if (setUserName && !userName && _.get(data, 'NAME')) {
    setUserName(data.NAME);
  }

  return (
    <React.Fragment>
      <div className="float-right">
        { setStage && <Button onClick={() => setStage(StageEnum.SIGN_UP_TO_SAVE)}>Log in to save & customize your card</Button> }
      </div>
      <h1>Your card</h1>

      <div className={cx('d-flex justify-content-between')}>
        <Card data={data} />
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

// export
export default compose(
  withCardHandlers,
)(Result);
