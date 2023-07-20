import { UserType } from './user.query.js';
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type/index.js';
import { FastifyInstance } from 'fastify';
import { CreateUser } from '../../models/mutation.model.js';

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const createUser = {
  type: UserType,
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput) },
  },
  resolve(parent, { dto }: CreateUser, context: FastifyInstance) {
    return context.prisma.user.create({ data: dto });
  },
};
