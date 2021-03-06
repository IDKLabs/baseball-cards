import _ from 'lodash';
import * as routes from 'constants/routes';

export const LinkEnum = Object.freeze({
  LANDING: {
    to: routes.LANDING,
    title: '🏠',
  },
  ACCOUNT: {
    to: routes.ACCOUNT,
    title: '',
    icon: 'fas fa-cog',
  },
  ADMIN: {
    to: routes.ADMIN,
    title: 'Admin',
  },
  SIGN_UP: {
    to: routes.SIGN_UP,
    title: 'Sign up',
  },
  SIGN_IN: {
    to: routes.SIGN_IN,
    title: 'Sign in',
  },
  CREATE: {
    to: routes.CREATE,
    title: 'Create your card',
  },
  LOG_OUT: {
    kind: 'LOG_OUT',
  },
});

export const defaultLinks = ({ isLoggedIn, isAdmin, ...props }) => (
  !isLoggedIn ? {
    groupOne: [],
    groupTwo: [{
      ...LinkEnum.CREATE,
      kind: 'button',
      styleNames: [],
      attrs: {
        action: true,
        small: true,
      },
    }, {
      ...LinkEnum.SIGN_IN,
      kind: 'button',
      styleNames: [],
      attrs: {
        link: true,
        small: true,
      },
    }],
  } : {
    groupOne: [{
      ...LinkEnum.LANDING,
      title: '🎨 Customize',
      styleNames: [],
    }, {
      to: `/team/${_.get(props, 'session.me.email').split('@')[1]}`,
      title: '✨ My team',
      // kind: 'button',
      styleNames: [],
      // attrs: {
      //   action: true,
      //   small: true,
      // },
    }],
    groupTwo: [
      ...isAdmin ? [{
        ...LinkEnum.ADMIN,
      }] : [],
      {
        ...LinkEnum.LOG_OUT,
      }],
  });
