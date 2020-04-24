import React from 'react';
import './App.css';
import { PostsList } from './components/postsList';
import { AddPost } from './components/addPost';
import { bem } from './utils/bem';

const b = bem('app');

function App() {
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

export default App;
