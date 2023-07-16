import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql/type/index.js';
import { MemberArg } from '../../../models/user.model.js';
import { FastifyInstance } from 'fastify';

export const MemberType = new GraphQLObjectType({
  name: 'member',
  fields: () => ({
    id: { type: GraphQLID },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
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
