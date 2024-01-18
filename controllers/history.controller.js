import { historyService } from "../services/index.js";
import { helper } from "../utils/index.js";

/**
 * Get weather history data
 */

const getWeatherHistory = async (req, res, next) => {
  try {
    helper.handlePayloadError(req);
    const result = await historyService.getWeatherHistory(req.params.location_id, req.query.days);
    helper.buildResponse(res, "Weather history fetched successfully.", result);
  } catch (error) {
    next(error);
  }
};

export default {
  getWeatherHistory,
};
