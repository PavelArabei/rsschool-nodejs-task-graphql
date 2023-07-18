import { GraphQLID, GraphQLObjectType } from 'graphql/type/index.js';

export const AuthorType = new GraphQLObjectType({
  name: 'authorId',
  fields: () => ({
    authorId: { type: GraphQLID },
    subscriberId: { type: GraphQLID },
  }),
});
export const SubscriberType = new GraphQLObjectType({
  name: 'subscriberId',
  fields: () => ({
    authorId: { type: GraphQLID },
    subscriberId: { type: GraphQLID },
  }),
});
