import React from 'react';
import { PostsList } from '../../components/postsList';
import { AddPost } from '../../components/addPost';
import { bem } from '../../utils/bem';
import './styles.css';

const b = bem('main-page');

export function MainPage() {
  return (
    <div className={b()}>
      <div className={b('grid')}>
        <section>
          
          <div className={b('add-post-form')}>
            <AddPost />
          </div>
          <PostsList isEditable />
        </section>
        <section>
          <PostsList />
        </section>
      </div>
    </div>
  );
}
