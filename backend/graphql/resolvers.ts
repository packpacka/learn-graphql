import uniqueId from "lodash/uniqueId";

const posts = [
  {
    id: uniqueId(),
    text: "Some post text",
  },
];

export const rootResolver = () => ({
  posts: () => posts,
  addPost: ({ post }: { post: { text: string } }) => {
    const newPost = {
      id: uniqueId(),
      ...post,
    };
    posts.push(newPost);
    return newPost;
  },
});
