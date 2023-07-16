import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type/index.js';
import { ID } from '../../../models/user.model.js';
import { FastifyInstance } from 'fastify';

export const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const Users = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args: ID, context: FastifyInstance) => {
    return context.prisma.user.findMany();
  },
};

export const User = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }: ID, context: FastifyInstance) => {
    return context.prisma.user.findUnique({ where: { id } });
  },
};
