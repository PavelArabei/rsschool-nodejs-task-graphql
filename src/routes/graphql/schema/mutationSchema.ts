import { GraphQLObjectType } from 'graphql/type/index.js';
import { createUser } from './user/user.mutation.js';
import { createPost } from './posts/posts.mutation.js';
import { createProfile } from './profile/profile.mutation.js';

export const MutationSchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    createPost,
    createProfile,
  }),
});
