import { GraphQLObjectType } from 'graphql/type/index.js';
import { changeUser, createUser, deleteUser } from './user/user.mutation.js';
import { changePost, createPost, deletePost } from './posts/posts.mutation.js';
import {
  changeProfile,
  createProfile,
  deleteProfile,
} from './profile/profile.mutation.js';
import {
  subscribeTo,
  unsubscribeFrom,
} from './subscribersOnAuthors/subscribers.mutation.js';

export const MutationSchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    createPost,
    createProfile,
    deletePost,
    deleteUser,
    deleteProfile,
    changeUser,
    changePost,
    changeProfile,
    subscribeTo,
    unsubscribeFrom,
  }),
});
