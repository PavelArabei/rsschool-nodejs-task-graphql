import { MEMBER } from '../../models/parent.model.js';
import { FastifyInstance } from 'fastify';

export const profileResolver = async (parent: MEMBER, args, context: FastifyInstance) => {
  return context.prisma.profile.findMany();
};
