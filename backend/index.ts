import express from "express";
import cors from "cors";
import { createGraphQlEndpoint } from "./graphql/createEndpoint";
import { connectDB } from "./db/connectDB";

const PORT = 5000;

const app = express();

const startSertver = async () => {
  await connectDB();

  app.use(cors());

  app.get("/request", (req, res) => {
    res.json({ test: "helloWorld1" });
  });

  app.get("/graphql", createGraphQlEndpoint({ graphiql: true }));
  app.post("/graphql", createGraphQlEndpoint({ graphiql: false }));
  // app.use("/graphql", createGraphQlEndpoint({ graphiql: true }));


  app.listen(PORT, (error) => {
    if (error) {
      return console.log("something bad happened", error);
    }

    console.log("listening on " + PORT + "...");
  });
};

startSertver();
