import { FastifyInstance } from 'fastify';
import { USER } from '../../models/parent.model.js';

export const postResolver = async (parent: USER, args, context: FastifyInstance) => {
  return context.prisma.post.findMany({ where: { authorId: parent.id } });
};

export const userSubToResolver = async (parent: USER, args, context: FastifyInstance) => {
  return context.prisma.subscribersOnAuthors.findMany({ where: { authorId: parent.id } });
};

export const subToUserResolver = async (parent: USER, args, context: FastifyInstance) => {
  return context.prisma.subscribersOnAuthors.findMany({
    where: { subscriberId: parent.id },
  });
};
export const profileResolver = async (parent: USER, args, context: FastifyInstance) => {
  return context.prisma.profile.findUnique({
    where: { userId: parent.id },
  });
};
