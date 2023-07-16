import { GraphQLSchema } from 'graphql/type/index.js';
import { Query } from './querySchema.js';

export const schema = new GraphQLSchema({
  query: Query,
});
