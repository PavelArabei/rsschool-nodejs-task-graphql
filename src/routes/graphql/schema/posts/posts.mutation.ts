import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type/index.js';
import { UserType } from '../user/user.query.js';
import { CreatePost } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';
import { UUIDType } from '../../types/uuid.js';

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const createPost = {
  type: UserType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) },
  },
  resolve(parent, { dto }: CreatePost, context: FastifyInstance) {
    return context.prisma.post.create({ data: dto });
  },
};
