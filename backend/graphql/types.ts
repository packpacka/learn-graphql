export type User = {
  id: string;
  login: string;
  postIds: string[];
};

export type Post = {
  id: string;
  text: string;
  authorId: string;
  author: User | null;
};

export type CreatePostRequest = {
  post: { text: string };
};
export type UpdatePostRequest = {
  post: { id: string; text: string };
};

export type CreateUserRequest = {
  user: { login: string; password: string };
};
