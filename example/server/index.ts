import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Listening...");
});
