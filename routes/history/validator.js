import { param, query } from "express-validator";

const getWeatherHistory = [
  param("location_id", "please enter valid location ID").exists().isMongoId(),
  query("days", "please enter valid days").exists().notEmpty().isInt({ gt: 0 }),
];

export default {
  getWeatherHistory,
};
