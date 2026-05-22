import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: "./.env",
});

const port = 8000;
const app = express();

app.listen(port, () => console.log(`server is  running on  localhost:${port}`));
