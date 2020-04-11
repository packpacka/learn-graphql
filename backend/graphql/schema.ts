import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Post {
  id: String!
  text: String!
}

input CreatePostRequest {
  text: String!
}

type RootQuery {
  posts: [Post!]
}

type RootMutation {
  addPost(post: CreatePostRequest): Post
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
