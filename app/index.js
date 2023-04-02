import {
  getCars,
  getSortCars,
  getById,
  addCar,
  verifyId,
} from "./repository.js";

import express, { json, request, response } from "express";

import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/v1/car/all", async (request, response) => {
  let cars = await getCars();
  response.status(200).json(cars);
});

//todo endpoint ce returneaza masinile sortate dupa marca

//todo endpoint ce returneaza dupa id o masina

app.get("/api/v1/car/sort/:field", async (request, response) => {
  console.log(request.params);
  let cars = await getSortCars(request.params.field);
  response.status(200).json(cars);
});

app.get("/api/v1/car/find/id/:id", async (request, response) => {
  let car = await getById(request.params.id);
  if (car !== null) {
    response.status(200).json(car);
  } else {
    response.status(400).json({ message: "Masina nu este in bazaq de date " });
  }
});
app.post("/api/v1/car/add", async (request, response) => {
  //car =request.body.car //destructurare

  let car = {
    make: request.body.make,
    model: request.body.model,
    year: request.body.year,
    color: request.body.color,
    price: request.body.price,
  };

  console.log(request.body);
  await addCar(car);
  response.status(200).json(car);
});

app.listen(5000, () => {
  console.log("express is listening on 3000");
});
