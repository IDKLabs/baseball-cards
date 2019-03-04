import _ from 'lodash';

const HogwartsHouseEmojis = Object.freeze({
  Gryffindor: '🦁',
  Ravenclaw: '🐦',
  Hufflepuff: '🐨',
  Slytherin: '🐍',
});

const RoleEmojis = Object.freeze({
  Engineer: '🛠',
  Design: '🎨',
  Product: '🔮',
  OTHER: '💪',
});

export const PetEmojis = Object.freeze({
  dogs: '🐶',
  cats: '😼',
  fish: '🐟',
  OTHER: '🦖',
});

const EnneagramEmojis = Object.freeze({
  OTHER: '💙',
});

const MeyersEmojis = Object.freeze({
  OTHER: '💛',
});

export const QuestionEnum = Object.freeze({
  NAME: {
    value: 'NAME',
    label: 'Name',
  },
  ROLE: {
    value: 'ROLE',
    label: 'Role',
    emoji: val => RoleEmojis[val] || RoleEmojis.OTHER,
  },
  ENNEAGRAM: {
    value: 'ENNEAGRAM',
    label: 'Enneagram',
    emoji: val => EnneagramEmojis[val] || EnneagramEmojis.OTHER,
  },
  MYERS: {
    value: 'MYERS',
    label: 'Myers-Briggs',
    emoji: val => MeyersEmojis[val] || MeyersEmojis.OTHER,
  },
  GITHUB: {
    value: 'GITHUB',
    label: 'Github',
    emoji: () => '💻',
  },
  FUN_FACTS: {
    value: 'FUN_FACTS',
    label: 'Fun facts',
  },
  STRENGTHS: {
    value: 'STRENGTHS',
    label: 'Strengths',
  },
  GROWTH_AREAS: {
    value: 'GROWTH_AREAS',
    label: 'Growth areas',
  },
  ETC: {
    value: 'ETC',
    label: 'etc',
  },
  VALUES: {
    value: 'VALUES',
    label: 'Values',
  },
  GOALS: {
    value: 'GOALS',
    label: 'Goals',
  },
  INSTAGRAM: {
    value: 'INSTAGRAM',
    label: 'Instagram',
  },
  EMOJI: {
    value: 'EMOJI',
    label: 'Favorite emoji',
    emoji: val => val,
  },
  HOGWARTS: {
    value: 'HOGWARTS',
    label: 'Hogwarts house',
    emoji: val => HogwartsHouseEmojis[val] || '',
  },
  SKILLS: {
    value: 'SKILLS',
    label: 'Skills',
  },
  PET: {
    value: 'PET',
    label: 'Pet',
    emoji: val => PetEmojis[val] || PetEmojis.OTHER,
  },
  PHOTO: {
    value: 'PHOTO',
    label: 'Pic',
  },
  FAVORITE_BOOK: {
    value: 'FAVORITE_BOOK',
    label: 'Favorite book',
    emoji: () => '📚',
  },
  FAVORITE_BOARD_GAME: {
    value: 'FAVORITE_BOARD_GAME',
    label: 'Favorite board game',
    emoji: () => '🎲',
  },
  NEXT_VACATION: {
    value: 'NEXT_VACATION',
    label: 'Next vacation',
    emoji: () => '🏝',
  },
  FAVORITE_TV_SHOW: {
    value: 'FAVORITE_TV_SHOW',
    label: 'Favorite TV Show',
    emoji: () => '📺',
  },
});

const QuestionIdEnum = Object.freeze({
  rnvWAsfgW4RE: QuestionEnum.NAME.value,
  vnvh1p0BHOjH: QuestionEnum.ROLE.value,
  OujNkQUEGcxq: QuestionEnum.ENNEAGRAM.value,
  lholtbCkm542: QuestionEnum.MYERS.value,
  yswVsZJF3OLY: QuestionEnum.GITHUB.value,
  LhOaJ52zKTqh: QuestionEnum.FUN_FACTS.value,
  ajOTXg81Ou9e: QuestionEnum.STRENGTHS.value,
  DmaCcx7NbRCK: QuestionEnum.GROWTH_AREAS.value,
  zCF8EtswjLgK: QuestionEnum.ETC.value,
  G2ClpKHU5MXL: QuestionEnum.VALUES.value,
  imO8dFX8WJYj: QuestionEnum.GOALS.value,
  ek8ABqe04iZA: QuestionEnum.INSTAGRAM.value,
  ENKedq86vJws: QuestionEnum.EMOJI.value,
  RJIuGCogR1O2: QuestionEnum.HOGWARTS.value,
  WkylEIcfBWYz: QuestionEnum.SKILLS.value,
  Etbsq0aUxmUq: QuestionEnum.PET.value,
  IZJcMN49vJRg: QuestionEnum.PHOTO.value,
  BvvQsh2qYBJ8: QuestionEnum.FAVORITE_BOOK.value,
  KqnZOPCv0QBS: QuestionEnum.FAVORITE_BOARD_GAME.value,
  kZPO5ihsEVtI: QuestionEnum.NEXT_VACATION.value,
  G6n5oMnKrOzT: QuestionEnum.FAVORITE_TV_SHOW.value,
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
    console.log('unknown answer format:');
    console.log(answer);
  }
  return answerVal;
};

export const parseAnswers = ({ answers }) => answers.reduce((acc, answer) => {
  const key = QuestionIdEnum[answer.field.id];
  if (!key) {
    console.log('answer missing q id:');
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
    console.log('multiple responses for email!');
    console.log(obj.response);
  }
  const data = {
    response: obj.response[0],
    survey: obj.survey,
  };

  const answers = parseAnswers(data.response);
  return answers;
};
