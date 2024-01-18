import { weatherService } from "../services/index.js";
import { helper } from "../utils/index.js";

/**
 * Get weather forecast data
 */

const getWeather = async (req, res, next) => {
  try {
    helper.handlePayloadError(req);
    const result = await weatherService.getWeather(req.params.location_id);
    helper.buildResponse(res, "Weather data fetched successfully.", result);
  } catch (error) {
    next(error);
  }
};

export default {
  getWeather,
};
