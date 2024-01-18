import { body, param, query } from "express-validator";

const addLocation = [
  body("name", "Please enter valid location name").exists().trim().notEmpty(),
  body("lat", "please enter valid latitude").exists().notEmpty(),
  body("lng", "please enter valid longitude").exists().notEmpty(),
];

const getLocation = [param("location_id", "please enter valid location ID").exists().isMongoId()];

const updateLocation = [...getLocation, ...addLocation];

const deleteLocation = [...getLocation];

const getLocations = [
  query("page", "Please enter valid page").optional().toInt().isInt({ gt: 0 }),
  query("pageSize", "Please enter valid pageSize").optional().toInt().isInt({ gt: 0 }),
];

export default {
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation,
  getLocations,
};
