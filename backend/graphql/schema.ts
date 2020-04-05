import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";

export const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, "schema.graphql")).toString()
);
