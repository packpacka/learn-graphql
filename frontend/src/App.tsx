import React from 'react';
import './App.css';
import { PostsList } from './components/postsList';
import { AddPost } from './components/addPost';

function App() {
  return (
    <div className="App">
      <AddPost />
      <PostsList />
    </div>
  );
}

export default App;
