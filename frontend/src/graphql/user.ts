import { gql } from '@apollo/client';

export const meQuery = gql`
  query me {
    me {
      id
      login
      postIds
    }
  }
`;

export const loginQuery = gql`
  query Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      id
      login
      postIds
    }
  }
`;
