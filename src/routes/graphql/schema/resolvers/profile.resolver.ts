import { PROFILE } from '../../models/parent.model.js';
import { FastifyInstance } from 'fastify';

export const userResolver = async (parent: PROFILE, args, context: FastifyInstance) => {
  return context.prisma.user.findUnique({
    where: { id: parent.userId },
  });
};

export const memberResolver = async (parent: PROFILE, args, context: FastifyInstance) => {
  return context.prisma.memberType.findUnique({
    where: { id: parent.memberTypeId },
  });
};
