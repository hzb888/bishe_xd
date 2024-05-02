import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_CN";

type mapType = {
  plateNumber: string;
  driver: string;
  orientation: number;
  lng: number;
  lat: number;
};

const mapList = (): Array<mapType> => {
  const result: Array<mapType> = [];
  for (let index = 0; index < 30; index++) {
    result.push({
      plateNumber: `皖L${faker.string.numeric({
        length: 5
      })}${faker.string.alphanumeric({
        casing: "upper"
      })}`,
      driver: faker.person.firstName(),
      orientation: faker.number.int({ min: 1, max: 360 }),
      lng: faker.location.latitude({ max: 117.08, min: 117.072 }),
      lat: faker.location.latitude({ max: 33.639, min: 33.628 })
    });
  }
  return result;
};

export default defineFakeRoute([
  {
    url: "/get-map-info",
    method: "get",
    response: () => {
      return {
        success: true,
        data: mapList()
      };
    }
  }
]);
