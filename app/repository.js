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
