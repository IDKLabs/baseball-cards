import _ from 'lodash';
import { parseAnswers } from '../Create/parse-data.js';

export default ({ responses, match }) => {
  // console.log(responses);
  const domain = _.get(match, 'params.domain');
  if (!domain) return [];
  const { items } = JSON.parse(responses) || {};
  const domainMatches = (items || []).filter((response) => {
    const email = _.get(response, 'hidden.email');
    if (!email) return false;
    return email.includes(domain);
  });
  return domainMatches.map(typeformResponse => parseAnswers(typeformResponse));
};
