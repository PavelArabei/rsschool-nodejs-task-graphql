import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql/type/index.js';
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify';
import { PROFILE, UUID } from '../../models/parent.model.js';
import { UserType } from '../user/user.query.js';
import { memberResolver, userResolver } from '../resolvers/profile.resolver.js';
import { MemberType } from '../member/member.query.js';
import { IncomingMessage, ServerResponse } from 'http';
import { UUIDType } from '../../types/uuid.js';

export const ProfileType: GraphQLObjectType<
  PROFILE,
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
> = new GraphQLObjectType({
  name: 'profile',
  fields: () => ({
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: userResolver,
    },
    memberType: {
      type: MemberType,
      resolve: memberResolver,
    },
  }),
});

export const Profiles = {
  type: new GraphQLList(ProfileType),
  resolve: async (parent, args: UUID, context: FastifyInstance) => {
    return context.prisma.profile.findMany();
  },
};

export const Profile = {
  type: ProfileType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (parent, { id }: UUID, context: FastifyInstance) => {
    return context.prisma.profile.findUnique({ where: { id } });
  },
};
