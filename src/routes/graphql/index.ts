import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schema/schema.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const documentNode = parse(query);
      const validationErrors = validate(schema, documentNode, [depthLimit(5)]);

      if (validationErrors.length > 0) {
        const errorMessages = validationErrors.map((error) => error.message);
        return {
          data: null,
          errors: errorMessages.map((message) => ({ message })),
        };
      }
      return await graphql({
        schema,
        source: query,
        contextValue: fastify,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
