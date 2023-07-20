import { GraphQLObjectType } from 'graphql/type/index.js';
import { createUser, deleteUser } from './user/user.mutation.js';
import { createPost, deletePost } from './posts/posts.mutation.js';
import { createProfile, deleteProfile } from './profile/profile.mutation.js';

export const MutationSchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    createPost,
    createProfile,
    deletePost,
    deleteUser,
    deleteProfile,
  }),
});
