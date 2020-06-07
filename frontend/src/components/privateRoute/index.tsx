import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { User } from 'learn-graphql-backend/graphql/types';
import { meQuery } from '../../graphql/user';

type Props = RouteProps;

export const PrivateRoute: React.FC<Props> = ({ component, render, ...rest }) => {
  const { loading, error, data } = useQuery<{ me: User }>(meQuery);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return null;
        }
        const currentUser = data?.me;

        if (!currentUser || error) {
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }

        if (component) {
          return React.createElement(component, props);
        }

        if (render) {
          return render(props);
        }

        return null;
      }}
    />
  );
};
