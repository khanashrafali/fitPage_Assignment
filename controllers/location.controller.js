import { locationService } from "../services/index.js";
import { helper } from "../utils/index.js";

/**
 * add location in the database
 */
const addLocation = async (req, res, next) => {
  try {
    helper.handlePayloadError(req);
    const result = await locationService.addLocation(req.body);
    helper.buildResponse(res, "Location saved successfully.", result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get locations list
 */
const getLocations = async (req, res, next) => {
  try {
    const result = await locationService.getLocations(req.query);
    helper.buildResponse(res, "Locations fetched successfully.", result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get location by Id
 */
const getLocation = async (req, res, next) => {
  try {
    const result = await locationService.getLocation(req.params.location_id);
    helper.buildResponse(res, "Location fetched successfully.", result);
  } catch (error) {
    next(error);
  }
};

/**
 * Update location
 */

const updateLocation = async (req, res, next) => {
  try {
    helper.handlePayloadError(req);
    const result = await locationService.updateLocation(req.params.location_id, req.body);
    helper.buildResponse(res, "Location updated successfully.", result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Location
 */

const deleteLocation = async (req, res, next) => {
  try {
    const result = await locationService.deleteLocation(req.params.location_id);
    helper.buildResponse(res, "Location deleted successfully.", result);
  } catch (error) {
    next(error);
  }
};

export default {
  addLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
