import { PostModel } from '../db/models/post';
import { UserModel } from '../db/models/user';
import { CreatePostRequest, UpdatePostRequest, CreateUserRequest, LoginRequest } from './types';
import { authenticate, AuthData } from '../auth';
import * as bcrypt from 'bcryptjs';

const userId = '5e91dfd5dbca598f1fafe041';

export const rootResolver = () => ({
  posts: () =>
    PostModel.find().then((posts) => {
      const res = posts.map((post) => {
        return {
          id: post.id,
          text: post.text,
          authorId: post.authorId,
          author: () => {
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
      return UserModel.findById(userId).then((user) => {
        if (user) {
          user.postIds.push(post._id);
          user.save().then(() => res);
        }
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
            return user.save().then(() => ({
              ...res,
              author: user,
            }));
          }
          return res;
        });
      });
  },
  deletePost: ({ id }: { id: string }) => {
    return PostModel.deleteOne({ _id: id }).then(() => {
      return UserModel.findById(userId).then((user) => {
        if (user) {
          user.postIds = user.postIds.filter((pId) => pId.toString() !== id);
          return user.save().then(() => id);
        }

        return id;
      });
    });
  },

  users: () => UserModel.find(),
  addUser: ({ user }: CreateUserRequest) => {
    const newUser = new UserModel({
      ...user,
      password: bcrypt.hashSync(user.password),
    });
    return newUser.save().then((res) => {
      return {
        id: res._id,
        login: res.login,
        postIds: res.postIds,
      };
    });
  },
  deleteUser: ({ id }: { id: string }) => {
    return UserModel.findById(id)
      .remove()
      .then(() => {
        return id;
      });
  },
  login: ({ login, password }: LoginRequest, req: any) => {
    return UserModel.findOne({ login }).then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((valid) => {
          if (valid) {
            authenticate({ userId: user._id, login: user.login }, req.res);

            return {
              id: user._id,
              login: user.login,
              postIds: user.postIds,
            };
          }
        });
      }
      return null;
    });
  },
  me: (params: any, req: any) => {
    const authData = req.authData as AuthData;

    if (authData) {
      return UserModel.findById(authData.userId);
    }
    return null;
  },
});
