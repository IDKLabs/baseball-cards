import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    userByEmail(email: String!): User
  }

  extend type Mutation {
    signUp(
      fullName: String!
      email: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
    updateUser(fullName: String!): User!
    deleteUser(id: ID!): Boolean!
    updatePreferences(preferences: PreferencesInput!): User!
  }

  type Token {
    token: String!
  }

  type Preferences {
    features: [String]
    facts: [String]
  }

  input PreferencesInput {
    features: [String]
    facts: [String]
  }

  type User {
    id: ID!
    username: String!
    fullName: String!
    email: String!
    role: String
    messages: [Message!]
    preferences: Preferences
  }
`;
