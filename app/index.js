import { getCars } from "./repository.js";

import express, { json, request, response } from "express";

import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/v1/car/all", async (request, response) => {
  let cars = await getCars();

  response.status(200).json(cars);
});

app.listen(5000, () => {
  console.log("express is listening on 3000");
});
