import dotenv from "dotenv";
import express from "express";
import dbConnection from "./db/dbConnection.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = 8000;

app.listen(port, () => console.log(`server is  running on  localhost:${port}`));
