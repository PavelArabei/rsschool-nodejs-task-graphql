// id: Type.String({
//   format: 'uuid',
// }),
//   isMale: Type.Boolean(),
//   yearOfBirth: Type.Integer(),
//   userId: userFields.id,
//   memberTypeId: memberTypeFields.id,

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql/type/index.js';
import { ID } from '../../../models/user.model.js';
import { FastifyInstance } from 'fastify';

export const ProfileType = new GraphQLObjectType({
  name: 'profile',
  fields: () => ({
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: GraphQLID },
  }),
});

export const Profiles = {
  type: new GraphQLList(ProfileType),
  resolve: async (parent, args: ID, context: FastifyInstance) => {
    return context.prisma.profile.findMany();
  },
};

export const Profile = {
  type: ProfileType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }: ID, context: FastifyInstance) => {
    return context.prisma.profile.findUnique({ where: { id } });
  },
};
