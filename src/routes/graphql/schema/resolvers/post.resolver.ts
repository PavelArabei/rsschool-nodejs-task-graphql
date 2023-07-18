import { POST } from '../../models/parent.model.js';
import { FastifyInstance } from 'fastify';

export const profileToPostResolver = async (
  parent: POST,
  args,
  context: FastifyInstance,
) => {
  return context.prisma.user.findUnique({
    where: { id: parent.authorId },
  });
};
