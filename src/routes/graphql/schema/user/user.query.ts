import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type/index.js';
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify';
import { PostType } from '../posts/post.query.js';
import { ProfileType } from '../profile/profile.query.js';
import { AuthorType, SubscriberType } from '../../models/gql.models.js';
import {
  postResolver,
  profileResolver,
  subToUserResolver,
  userSubToResolver,
} from '../resolvers/user.resolver.js';
import { USER, UUID } from '../../models/parent.model.js';
import { IncomingMessage, ServerResponse } from 'http';
import { UUIDType } from '../../types/uuid.js';

export const UserType: GraphQLObjectType<
  USER,
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
> = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: profileResolver,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: postResolver,
    },
    userSubscribedTo: {
      type: new GraphQLList(AuthorType),
      resolve: userSubToResolver,
    },
    subscribedToUser: {
      type: new GraphQLList(SubscriberType),
      resolve: subToUserResolver,
    },
  }),
});

export const Users = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args: UUID, context: FastifyInstance) => {
    return context.prisma.user.findMany();
  },
};

export const User = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (parent, { id }: UUID, context: FastifyInstance) => {
    return context.prisma.user.findUnique({ where: { id } });
  },
};
