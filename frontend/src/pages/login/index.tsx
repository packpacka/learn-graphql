import React, { useState, useCallback, FormEvent } from 'react';
import { bem } from '../../utils/bem';
import './styles.css';
import { useQuery } from '@apollo/client';
import { loginQuery, meQuery } from '../../graphql/user';
import { client } from '../../graphql/client';

const b = bem('login-page');

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    client
      .query({
        query: loginQuery,
        variables: {
          login,
          password,
        },
      })
      .then(({ data }) => {
        client.writeQuery({
          query: meQuery,
          data: { me: data.login },
        });
        window.location.href = '/';
      });
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="gqlearn-login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name="gqlearn-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
