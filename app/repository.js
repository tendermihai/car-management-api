import fs from "fs";
import path from "path";

export function getCars() {
  return new Promise((response, reject) => {
    fs.readFile("data.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const cars = JSON.parse(data);
        response(cars);
      }
    });
  });
}
