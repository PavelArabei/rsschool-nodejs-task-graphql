import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/index.js';
import { UUIDType } from '../../types/uuid.js';
import { subscribeArgs } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';

const SubscribeToType = new GraphQLObjectType({
  name: 'subscribeTo',
  fields: () => ({
    id: { type: UUIDType },
  }),
});

const UnsubscribeFromType = new GraphQLObjectType({
  name: 'unsubscribeFrom',
  fields: () => ({
    id: { type: UUIDType },
  }),
});

export const subscribeTo = {
  type: SubscribeToType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve(parent, { userId, authorId }: subscribeArgs, context: FastifyInstance) {
    return context.prisma.subscribersOnAuthors.create({
      data: { subscriberId: userId, authorId },
    });
  },
};
export const unsubscribeFrom = {
  type: GraphQLBoolean,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (
    parent,
    { userId, authorId }: subscribeArgs,
    context: FastifyInstance,
  ) => {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    });
  },
};
