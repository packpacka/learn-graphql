import { buildSchema } from 'graphql';

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

input UpdatePostRequest {
  id: String!
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
  posts: [Post!]!
  users: [User!]!
  message: String!
}

type RootMutation {
  addPost(post: CreatePostRequest): Post
  updatePost(post: UpdatePostRequest): Post
  deletePost(id: String): String!
  addUser(user: CreateUserRequest): User
  deleteUser(id: String): String!
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
