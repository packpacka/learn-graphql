import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { addPostMutation } from '../../graphql/posts';

export const AddPost: React.FC<{}> = () => {
  const [postText, setPostText] = useState<string>('');

  const [addPost] = useMutation(addPostMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ variables: { text: postText } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={(e) => setPostText(e.target.value)} value={postText} />
      <button type="submit">Добавить</button>
    </form>
  );
};
