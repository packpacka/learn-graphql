import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { deletePostMutation, updatePostMutation, postsQuery } from '../../graphql/posts';
import { Post as PostType } from 'learn-graphql-backend/graphql/types';

export const Post: React.FC<{ post: PostType }> = ({ post }) => {
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
    <article key={post.id}>
      {!isEditMode && (
        <>
          <p>{post.text}</p>
          <button onClick={() => setEditMode(true)}>Редактировать</button>
        </>
      )}
      {isEditMode && (
        <>
          <form onSubmit={handleSubmit}>
            <textarea onChange={(e) => setPostText(e.target.value)} value={postText} />
            <button type="submit">Сохранить</button>
          </form>
        </>
      )}
      <button type="button" onClick={() => deletePost({ variables: { id: post.id } })}>
        Удалить
      </button>
      <h4>{post.author?.login}</h4>
    </article>
  );
};
