import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql/type/index.js';
import { CreateProfile } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile.query.js';
import { PROFILE } from '../../models/parent.model.js';

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
  type: ProfileType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  resolve(parent, { dto }: CreateProfile, context: FastifyInstance) {
    return context.prisma.profile.create({ data: dto });
  },
};

export const deleteProfile = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (parent, { id }: PROFILE, context: FastifyInstance) => {
    try {
      await context.prisma.profile.delete({ where: { id } });
      return null;
    } catch (err) {
      return err;
    }
  },
};
