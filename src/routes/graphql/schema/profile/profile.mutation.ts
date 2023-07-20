import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql/type/index.js';
import { UserType } from '../user/user.query.js';
import { CreateProfile } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';
import { UUIDType } from '../../types/uuid.js';

//
// isMale: { type: GraphQLBoolean },
// yearOfBirth: { type: GraphQLInt },
// userId: { type: GraphQLID },
// memberTypeId: { type: GraphQLID },

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLID) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

export const createProfile = {
  type: UserType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  resolve(parent, { dto }: CreateProfile, context: FastifyInstance) {
    return context.prisma.profile.create({ data: dto });
  },
};
