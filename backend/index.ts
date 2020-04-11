import express from "express";
import cors from "cors";
import { createGraphQlEndpoint } from "./graphql/createEndpoint";
import { connectDB } from "./db/connectDB";

const PORT = 5000;

const app = express();

const startSertver = async () => {
  const db = await connectDB();

  app.get("/request", (req, res) => {
    res.json({ test: "helloWorld1" });
  });

  app.use("/graphql", createGraphQlEndpoint({ graphiql: true }));

  app.use(cors());

  app.listen(PORT, (error) => {
    if (error) {
      return console.log("something bad happened", error);
    }

    console.log("listening on " + PORT + "...");
  });
};

startSertver();
