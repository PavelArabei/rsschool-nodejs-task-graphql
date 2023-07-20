import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql/type/index.js';
import { CreateProfile, UpdateProfile } from '../../models/mutation.model.js';
import { FastifyInstance } from 'fastify';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile.query.js';
import { PROFILE } from '../../models/parent.model.js';

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLID) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    id: { type: UUIDType },
    memberTypeId: { type: GraphQLID },
    yearOfBirth: { type: GraphQLInt },
    isMale: { type: GraphQLBoolean },
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

export const changeProfile = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) },
  },
  resolve(parent, { id, dto }: UpdateProfile, context: FastifyInstance) {
    return context.prisma.profile.update({
      where: { id },
      data: dto,
    });
  },
};
