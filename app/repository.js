import fs from "fs";
import path from "path";

export function getCars() {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const cars = JSON.parse(data);
        resolve(cars);
      }
    });
  });
}

export async function getSortCars(field) {
  let cars = await getCars();
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      if (cars[i][field] > cars[j][field]) {
        let aux = cars[i];
        cars[i] = cars[j];
        cars[j] = aux;
      }
    }
  }

  return cars;
}

export async function getById(id) {
  let cars = await getCars();
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].id === id) {
      return cars[i];
    }
  }
  return null;
}

export function save(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("data.json", JSON.stringify(data), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function addCar(car) {
  let cars = await getCars();

  car.id = await generateId();

  cars.push(car);

  save(cars);
}

//todo ce verifica daca exista un id

export async function verifyId(cars, id) {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].id == id) {
      return true;
    }
  }

  return false;
}

export async function generateId() {
  let cars = await getCars();

  let id = Math.random() * 1000000 + 10000 + "";

  while (verifyId(cars, id) == true) {
    id = Math.random() * 1000000 + 10000 + "";
  }

  return id.replace(".", "");
}

export async function deleteCar(id) {
  let data = await getCars();
  let filter = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].id != id) {
      filter.push(data[i]);
    }
  }
  save(filter);
}

//ex{id:1FTEW1CM4BK831059,make:"dacia"}
export async function updateCar(editableCar) {
  let data = await getCars();
  console.log(editableCar);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == editableCar.id) {
      console.log("test");
      if (editableCar.make) {
        data[i].make = editableCar.make;
      }

      if (editableCar.model) {
        data[i].model = editableCar.model;
      }

      if (editableCar.year) {
        data[i].year = editableCar.year;
        console.log("test in if year");
      }

      if (editableCar.color) {
        data[i].color = editableCar.color;
      }

      if (editableCar.price) {
        data[i].price = editableCar.price;
      }

      console.log(data[i]);
    }
  }
  save(data);
}
