import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Post {
  id: String!
  text: String!
  authorId: String
  author: User
}

input CreatePostRequest {
  text: String!
}

input CreateUserRequest {
  login: String!
  password: String!
}

type User {
  id: String!
  login: String!
  postIds: [String]!
}

type RootQuery {
  posts: [Post!]!,
  users: [User!]!
}

type RootMutation {
  addPost(post: CreatePostRequest): Post
  deletePost(id: String): Boolean
  addUser(user: CreateUserRequest): User
  deleteUser(id: String): Boolean
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
