import { gql } from "@apollo/client";
import { client } from "./client";

export const getPosts = () => {
  return client.query({
    query: gql`
      query {
        message
      }
    `,
    variables: null,
  });
};
