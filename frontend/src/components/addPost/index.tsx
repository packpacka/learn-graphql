import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { addPostMutation, postsQuery } from '../../graphql/posts';
import { Post } from 'learn-graphql-backend/graphql/types';

export const AddPost: React.FC<{}> = () => {
  const [postText, setPostText] = useState<string>('');

  const [addPost] = useMutation<Post>(addPostMutation, {
    update: (cache, res) => {
      const currentPosts = cache.readQuery<{ posts: Post[] }>({ query: postsQuery })?.posts || [];
      cache.writeQuery({
        query: postsQuery,
        data: { posts: [...currentPosts, res.data.addPost] },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ variables: { text: postText } })
      .then(() => {
        setPostText('');
      })
      .catch(() => {
        alert('Что-то пошло не так');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={(e) => setPostText(e.target.value)} value={postText} />
      <button type="submit">Добавить</button>
    </form>
  );
};
