import express from "express";
import cors from "cors";
import { createGraphQlEndpoint } from "./graphql/createEndpoint";

const PORT = 5000;

const app = express();

app.use(cors());

app.get("/request", (req, res) => {
  res.json({ test: "helloWorld1" });
});

app.get("/graphql", createGraphQlEndpoint({ graphiql: true }));
app.post("/graphql", createGraphQlEndpoint({ graphiql: false }));

// start the app
app.listen(PORT, error => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
