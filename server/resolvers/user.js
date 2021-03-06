import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import faker from 'faker';
import { isAdmin, isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn = '365d') => {
  const {
    id, email, username, role,
  } = user;
  return await jwt.sign({
    id, email, username, role,
  }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.find(),
    user: async (parent, { id }, { models }) => await models.User.findById(id),
    userByEmail: async (parent, { email }, { models }) => await models.User.findOne({ email }),
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findById(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { fullName, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        fullName,
        email,
        password,
        username: `${faker.internet.userName()}${faker.random.number()}`,
      });

      return { token: createToken(user, secret) };
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this email. Need to sign up?',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Incorrect password.');
      }

      return { token: createToken(user, secret) };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => await models.User.findByIdAndUpdate(
        me.id,
        { username },
        { new: true },
      ),
    ),

    updatePreferences: combineResolvers(
      isAuthenticated,
      async (parent, { preferences }, { models, me }) => await models.User.findByIdAndUpdate(
        me.id,
        { preferences },
        { new: true },
      ),
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const user = await models.User.findById(id);

        if (user) {
          await user.remove();
          return true;
        }
        return false;
      },
    ),
  },

  User: {
    messages: async (user, args, { models }) => await models.Message.find({
      userId: user.id,
    }),
  },
};
