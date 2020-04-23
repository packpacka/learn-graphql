import { PostModel } from '../db/models/post';
import { UserModel } from '../db/models/user';
import { User, Post, CreatePostRequest, UpdatePostRequest, CreateUserRequest } from './types';
import { defaultFieldResolver } from 'graphql';

const userId = '5e91dfd5dbca598f1fafe041';

export const rootResolver = () => ({
  posts: () =>
    PostModel.find().then((posts) => {
      const res = posts.map((post) => {
        return {
          id: post.id,
          text: post.text,
          authorId: post.authorId,
          author: (parent: any, context: any, info: any) => {
            return UserModel.findById(post.authorId).then((user) => {
              if (!user) {
                return null;
              }
              return {
                id: user._id,
                login: user.login,
                postIds: user.postIds,
              };
            });
          },
        };
      });
      return res;
    }),
  addPost: ({ post }: CreatePostRequest) => {
    const newPost = new PostModel({
      ...post,
      authorId: userId,
    });
    return newPost.save().then((post) => {
      const res = {
        id: post._id,
        text: post.text,
        authorId: post.authorId,
      };
      console.log('add ok', res);
      return UserModel.findById(userId).then((user) => {
        if (user) {
          user.postIds.push(post.id);
          user.save().then(() => res);
        }
        console.log('user add ok', res);
        return {
          ...res,
          author: user,
        };
      });
    });
  },
  updatePost: ({ post: { id, ...otherProps } }: UpdatePostRequest) => {
    return PostModel.findByIdAndUpdate(id, otherProps)
      .exec()
      .then((post) => {
        if (!post) {
          throw new Error(`Can't update post ${id}`);
        }
        const res = {
          ...otherProps,
          id: post._id,
          authorId: post.authorId,
        };
        return UserModel.findById(userId).then((user) => {
          if (user) {
            user.postIds.push(post.id);
            user.save().then(() => res);
          }
          return {
            ...res,
            author: user,
          };
        });
      });
  },
  deletePost: ({ id }: { id: string }) => {
    return PostModel.deleteOne({ _id: id }).then(() => {
      return true;
    });
  },

  users: () => UserModel.find(),
  addUser: ({ user }: { user: CreateUserRequest }) => {
    const newUser = new UserModel({
      ...user,
    });
    return newUser.save().then((res) => {
      return {
        id: res._id,
        login: res.login,
        postIds: [],
      };
    });
  },
  deleteUser: ({ id }: { id: string }) => {
    return UserModel.findById(id)
      .remove()
      .then(() => {
        return true;
      });
  },
});
