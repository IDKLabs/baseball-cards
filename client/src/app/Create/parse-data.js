import _ from 'lodash';

const QuestionEnum = Object.freeze({
  rnvWAsfgW4RE: 'NAME',
  vnvh1p0BHOjH: 'ROLE',
  OujNkQUEGcxq: 'ENNEAGRAM',
  lholtbCkm542: 'MYERS',
  yswVsZJF3OLY: 'GITHUB',
  LhOaJ52zKTqh: 'FUN_FACTS',
  ajOTXg81Ou9e: 'STRENGTHS',
  DmaCcx7NbRCK: 'GROWTH_AREAS',
  zCF8EtswjLgK: 'ETC',
  G2ClpKHU5MXL: 'VALUES',
  imO8dFX8WJYj: 'GOALS',
  ek8ABqe04iZA: 'INSTAGRAM',
  ENKedq86vJws: 'EMOJI',
  RJIuGCogR1O2: 'HOGWARTS',
  WkylEIcfBWYz: 'SKILLS',
  Etbsq0aUxmUq: 'PET',
  IZJcMN49vJRg: 'PHOTO',
  BvvQsh2qYBJ8: 'FAVORITE_BOOK',
  KqnZOPCv0QBS: '??',
  kZPO5ihsEVtI: 'NEXT_VACATION',
  G6n5oMnKrOzT: 'FAVORITE_TV_SHOW',
});

const parseAnswer = (answer) => {
  let answerVal = '';
  if (answer.type === 'text') {
    answerVal = answer.text;
  } else if (answer.type === 'choice') {
    answerVal = answer.choice.label;
  } else if (answer.type === 'file_url') {
    answerVal = answer.file_url;
  } else if (!answerVal || typeof answerVal !== 'string') {
    console.warn('unknown answer format:');
    console.log(answer);
  }
  return answerVal;
};

export const parseAnswers = ({ answers }) => answers.reduce((acc, answer) => {
  const key = QuestionEnum[answer.field.id];
  if (!key) {
    console.warn('answer missing q id:');
    console.log(answer);
    return acc;
  }
  const answerValue = parseAnswer(answer);
  if (!answerValue) return acc;
  return {
    ...acc,
    [key]: answerValue,
  };
}, {});

export default (props) => {
  const { typeformResponse } = props;
  let obj = typeformResponse;
  if (typeof obj === 'string') {
    obj = JSON.parse(typeformResponse);
  }
  if (!_.get(obj, 'response.0')) {
    return null;
  }
  if (_.get(obj, 'response.1')) {
    console.warn('multiple responses for email!');
    console.log(obj.response);
  }
  const data = {
    response: obj.response[0],
    survey: obj.survey,
  };

  const answers = parseAnswers(data.response);

  console.log(answers);
  return answers;
};
