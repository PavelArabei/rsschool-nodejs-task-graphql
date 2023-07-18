import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql/type/index.js';
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify';
import { MEMBER, MemberArg } from '../../models/parent.model.js';
import { ProfileType } from '../profile/profile.query.js';
import { profileResolver } from '../resolvers/member.resolver.js';
import { IncomingMessage, ServerResponse } from 'http';

export const MemberType: GraphQLObjectType<
  MEMBER,
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
> = new GraphQLObjectType({
  name: 'memberTypes',
  fields: () => ({
    id: { type: GraphQLID },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: profileResolver,
    },
  }),
});

export const Members = {
  type: new GraphQLList(MemberType),
  resolve: async (parent, args: MemberArg, context: FastifyInstance) => {
    return context.prisma.memberType.findMany();
  },
};

export const Member = {
  type: MemberType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }: MemberArg, context: FastifyInstance) => {
    return context.prisma.memberType.findUnique({ where: { id } });
  },
};
