import { GraphQLObjectType } from 'graphql/type/index.js';
import { User, Users } from './user/user.query.js';
import { Member, Members } from './member/member.query.js';
import { Post, Posts } from './posts/post.query.js';
import { Profile, Profiles } from './profile/profile.query.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: User,
    users: Users,
    member: Member,
    members: Members,
    post: Post,
    posts: Posts,
    profile: Profile,
    profiles: Profiles,
  },
});
