import express from "express";
import { router } from "@prisma-generator-proto/example-prisma";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(3001, () => {
  console.log("Listening...");
});
