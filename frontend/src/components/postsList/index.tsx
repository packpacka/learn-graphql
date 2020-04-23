import React from 'react';
import { useQuery } from '@apollo/client';
import { postsQuery } from '../../graphql/posts';
import { Post as PostType } from 'learn-graphql-backend/graphql/types';
import { Post } from '../post';

export const PostsList: React.FC<{}> = () => {
  const { loading, error, data } = useQuery<{ posts: PostType[] }>(postsQuery);

  if (loading) {
    return <h2>Загрузка</h2>;
  }
  if (error) {
    return (
      <>
        <h2>Ошибка загрузки</h2>
        {JSON.stringify(error)}
      </>
    );
  }
  return (
    <ul>
      {data &&
        data.posts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
    </ul>
  );
};
