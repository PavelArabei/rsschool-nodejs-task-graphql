import { GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql/type/index.js';
import {
  subToUserResolver,
  userSubToResolver,
} from '../schema/resolvers/user.resolver.js';
import { USER } from './parent.model.js';
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export const AuthorType = new GraphQLObjectType({
  name: 'subscribedToUser',
  fields: () => ({
    id: { type: GraphQLID },
    subscribedToUser: {
      type: new GraphQLList(SubscriberType),
      resolve: subToUserResolver,
    },
  }),
});
export const SubscriberType: GraphQLObjectType<
  USER,
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
> = new GraphQLObjectType({
  name: 'subscriberId',
  fields: () => ({
    id: { type: GraphQLID },
    userSubscribedTo: { type: new GraphQLList(AuthorType), resolve: userSubToResolver },
  }),
});
