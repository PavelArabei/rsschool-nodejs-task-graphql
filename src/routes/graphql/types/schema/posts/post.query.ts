import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type/index.js';
import { ID } from '../../../models/user.model.js';
import { FastifyInstance } from 'fastify';

export const PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }),
});

export const Posts = {
  type: new GraphQLList(PostType),
  resolve: async (parent, args: ID, context: FastifyInstance) => {
    return context.prisma.post.findMany();
  },
};

export const Post = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }: ID, context: FastifyInstance) => {
    return context.prisma.post.findUnique({ where: { id } });
  },
};
