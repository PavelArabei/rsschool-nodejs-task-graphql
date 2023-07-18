import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type/index.js';
import { FastifyInstance } from 'fastify';
import { UUID } from '../../models/parent.model.js';
import { UserType } from '../user/user.query.js';
import { profileToPostResolver } from '../resolvers/post.resolver.js';

export const PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: profileToPostResolver,
    },
  }),
});

export const Posts = {
  type: new GraphQLList(PostType),
  resolve: async (parent, args: UUID, context: FastifyInstance) => {
    return context.prisma.post.findMany();
  },
};

export const Post = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }: UUID, context: FastifyInstance) => {
    return context.prisma.post.findUnique({ where: { id } });
  },
};
