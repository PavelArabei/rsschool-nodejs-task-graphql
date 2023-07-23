import { GraphQLSchema } from 'graphql/type/index.js';
import { Query } from './querySchema.js';
import { MutationSchema } from './mutationSchema.js';

export const schema = new GraphQLSchema({
  query: Query,
  mutation: MutationSchema,
});
