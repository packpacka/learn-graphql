import React from 'react';
import { useQuery } from '@apollo/client';
import { postsQuery } from '../../graphql/posts';
import { Post as PostType } from 'learn-graphql-backend/graphql/types';
import { Post } from '../post';
import { bem } from '../../utils/bem';

import './styles.css';

const b = bem('posts-list');

type Props = {
  isEditable?: boolean;
};
export const PostsList: React.FC<Props> = ({ isEditable }) => {
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
    <ul className={b()}>
      {data &&
        data.posts.map((post) => (
          <li key={post.id} className={b('item')}>
            <Post post={post} isEditable={isEditable} />
          </li>
        ))}
    </ul>
  );
};
