import { config } from "../config";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${config.baseApiUrl}/graphql`,
  }),
});
