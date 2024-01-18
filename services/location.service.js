import { locationModel } from "../model/index.js";
import { helper } from "../utils/index.js";

/**
 * Add Location in database
 */

const addLocation = async (body) => {
  try {
    const { name, lat, lng } = body;
    let coords = [+lng, +lat];
    const existingLocation = await locationModel.findOne({ "loc.coordinates": coords });
    if (existingLocation) throw helper.buildError("Location with similar coordinates already exists", 409);
    body.loc = { type: "Point", coordinates: coords };
    return await locationModel.create({ ...body });
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch all locations
 */

const getLocations = async (queryParams) => {
  try {
    let conditions = {};
    const { textSearch } = queryParams;
    const pageInfo = helper.checkPagination(queryParams);
    if (textSearch) conditions.name = { $regex: helper.regxEscape(textSearch), $options: "i" };

    const count = await locationModel.countDocuments(conditions);
    let docs = [];
    const mongoQuery = locationModel.find(conditions);
    if (pageInfo) docs = await mongoQuery.skip(pageInfo.skip).limit(pageInfo.pageSize);
    else docs = await mongoQuery;
    return helper.makePaginatedData(docs, count, pageInfo);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch location by ID
 */
const getLocation = async (locationId) => {
  try {
    const location = await locationModel.findOne({ _id: locationId });
    if (!location) throw helper.buildError("Location not found", 404);
    return location;
  } catch (error) {
    throw error;
  }
};

/**
 * Update location
 */

const updateLocation = async (locationId, body) => {
  try {
    const location = await locationModel.findOne({ _id: locationId });
    if (!location) throw helper.buildError("Location not found", 404);
    if (body.lat || body.lng) {
      let coords = [+body.lng, +body.lat];
      body.loc = { type: "Point", coordinates: coords };
    }
    await location.set({ ...body }).save();
  } catch (error) {
    throw error;
  }
};

/**
 * Delete location
 */

const deleteLocation = async (locationId) => {
  try {
    const location = await locationModel.findOne({ _id: locationId });
    if (!location) throw helper.buildError("Location not found", 404);
    return await location.delete();
  } catch (error) {
    throw error;
  }
};

export default {
  addLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
