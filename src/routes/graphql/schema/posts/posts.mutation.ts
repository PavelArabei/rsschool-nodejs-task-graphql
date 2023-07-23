import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type/index.js';
import { CreatePost, UpdatePost } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from './post.query.js';
import { POST } from '../../models/parent.model.js';

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  }),
});

export const createPost = {
  type: PostType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) },
  },
  resolve(parent, { dto }: CreatePost, context: FastifyInstance) {
    return context.prisma.post.create({ data: dto });
  },
};

export const deletePost = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (parent, { id }: POST, context: FastifyInstance) => {
    try {
      await context.prisma.post.delete({ where: { id } });
      return null;
    } catch (err) {
      return err;
    }
  },
};

export const changePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangePostInput) },
  },
  resolve(parent, { id, dto }: UpdatePost, context: FastifyInstance) {
    return context.prisma.post.update({ where: { id }, data: dto });
  },
};
