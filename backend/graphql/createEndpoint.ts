import expressGraphQL from "express-graphql";
import { schema } from "./schema";
import { rootResolver } from "./resolvers";

export const createGraphQlEndpoint = (props: { graphiql: boolean }) => {
  return expressGraphQL({
    schema: schema,
    rootValue: rootResolver(),
    graphiql: props.graphiql
  });
};
