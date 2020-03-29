import express from "express";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());

app.get("/request", (req, res) => {
  res.json({ test: "helloWorld1" });
});

// start the app
app.listen(PORT, error => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
