import { Post } from "../db/models/post";

export const rootResolver = () => ({
  posts: () => Post.find(),
  addPost: ({ post }: { post: { text: string } }) => {
    const newPost = new Post({
      ...post,
    });
    return newPost.save().then((res) => {
      return {
        id: res.id,
        text: res.text,
      };
    });
  },
});
