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
import { CustomizableCardWithHandlers, CardPreview } from '../Create/Card';
import styles from './team.module.scss';
import TeamCard from './TeamCard';

const GET_TYPEFORM_RESPONSES = gql`
  query {
    responses
  }
`;


const Team = ({
  loading, ...props
}) => {
  if (loading) {
    return <Loading />;
  }
  const domain = _.get(props, 'match.params.domain');
  const datum = parseData(props);
  if (!datum.length) {
    return <p className="text-center">No cards found for <b>{domain}</b>. Be the first to <Link to="/create">create one!</Link></p>;
  }
  return (
    <div>
      <div className="d-flex justify-content-around flex-wrap">
        {datum.map((teammateData, i) => <TeamCard key={_.get(teammateData, 'userEmail', i)} {...props} {...teammateData} />)}
      </div>

      <div className={cx('d-flex justify-content-center mt-4')}>
        { !_.get(props, 'session.me') && <Button action to="/create">Create your own</Button> }
      </div>
    </div>
  );
};

export default compose(
  withState('popupData', 'setPopupData', null),
  graphql(GET_TYPEFORM_RESPONSES, {
    props: ({ data }) => data,
  }),
  withRouter,
)(Team);
