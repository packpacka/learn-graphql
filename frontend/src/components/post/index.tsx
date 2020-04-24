import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { deletePostMutation, updatePostMutation, postsQuery } from '../../graphql/posts';
import { Post as PostType } from 'learn-graphql-backend/graphql/types';
import { bem } from '../../utils/bem';

import './styles.css';

const b = bem('post');

type Props = {
  post: PostType;
  isEditable?: boolean;
};
export const Post: React.FC<Props> = ({ post, isEditable }) => {
  const [deletePost] = useMutation(deletePostMutation, {
    update: (cache, res) => {
      const currentPosts =
        cache.readQuery<{ posts: PostType[] }>({ query: postsQuery })?.posts || [];

      cache.writeQuery({
        query: postsQuery,
        data: { posts: currentPosts.filter((p) => p.id !== res.data.deletePost) }, //TODO: как типизировать res?
      });
    },
  });
  const [isEditMode, setEditMode] = useState(false);
  const [postText, setPostText] = useState<string>(post.text);

  const [updatePost] = useMutation(updatePostMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost({ variables: { text: postText, id: post.id } }).then(() => {
      setEditMode(false);
    });
  };

  return (
    <article key={post.id} className={b()}>
      {!isEditMode && (
        <>
          <p className={b('text')}>{post.text}</p>
        </>
      )}
      {isEditMode && (
        <>
          <form onSubmit={handleSubmit}>
            <textarea
              className={b('text-input')}
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            />
            <button type="submit">Сохранить</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Отмена
            </button>
          </form>
        </>
      )}
      {isEditable && !isEditMode && (
        <div className={b('buttons-block')}>
          <button className={b('button')} onClick={() => setEditMode(true)}>
            Редактировать
          </button>
          <button
            type="button"
            className={b('button')}
            onClick={() => deletePost({ variables: { id: post.id } })}
          >
            Удалить
          </button>
        </div>
      )}
      <div className={b('author')}>Автор: {post.author?.login}</div>
    </article>
  );
};
