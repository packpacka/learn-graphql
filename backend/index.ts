import express from 'express';
import cors from 'cors';
import { createGraphQlEndpoint } from './graphql/createEndpoint';
import { connectDB } from './db/connectDB';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './auth';

const PORT = 5000;

const app = express();

const startSertver = async () => {
  await connectDB();

  app.use(cors());
  app.use(cookieParser());

  app.use(authMiddleware());

  app.get('/graphql', createGraphQlEndpoint({ graphiql: true }));
  app.post('/graphql', createGraphQlEndpoint({ graphiql: false }));

  app.listen(PORT, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('listening on ' + PORT + '...');
  });
};

startSertver();
