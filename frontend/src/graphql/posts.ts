import { gql } from '@apollo/client';

export const postsQuery = gql`
  query allPosts {
    posts {
      id
      text
      authorId
      author {
        id
        login
      }
    }
  }
`;

export const addPostMutation = gql`
  mutation addPost($text: String!) {
    addPost(post: { text: $text }) {
      id
      text
      authorId
      author {
        id
        login
      }
    }
  }
`;
export const updatePostMutation = gql`
  mutation updatePost($text: String!, $id: String!) {
    updatePost(post: { text: $text, id: $id }) {
      id
      text
      authorId
    }
  }
`;

export const deletePostMutation = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id)
  }
`;
