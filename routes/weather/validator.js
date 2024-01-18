import { param } from "express-validator";

const getWeather = [param("location_id", "please enter valid location ID").exists().isMongoId()];

export default {
  getWeather,
};
