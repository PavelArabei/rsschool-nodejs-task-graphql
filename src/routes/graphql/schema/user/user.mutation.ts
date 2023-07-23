import { UserType } from './user.query.js';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type/index.js';
import { FastifyInstance } from 'fastify';
import { CreateUser, UpdateUser } from '../../models/mutation.model.js';
import { UUIDType } from '../../types/uuid.js';
import { USER } from '../../models/parent.model.js';

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: UUIDType },
    balance: { type: GraphQLFloat },
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

export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (parent, { id }: USER, context: FastifyInstance) => {
    try {
      await context.prisma.user.delete({ where: { id } });
      return null;
    } catch (err) {
      return err;
    }
  },
};

export const changeUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInput) },
  },
  resolve(parent, { id, dto }: UpdateUser, context: FastifyInstance) {
    return context.prisma.user.update({ where: { id }, data: dto });
  },
};
