import { locationModel } from "../model/index.js";
import axios from "axios";
import { helper } from "../utils/index.js";
import moment from "moment";
import NodeCache from "node-cache";
const cache = new NodeCache();

helper.loadEnvFile();

const getWeatherHistory = async (locationId, days) => {
  try {
    const cacheKey = `weather-history-${locationId}-${days}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const location = await locationModel.findOne({ _id: locationId });
    if (!location) throw helper.buildError("Location not found");
    const [longitude, latitude] = location.loc.coordinates;
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment().subtract(parseInt(days), "days").format("YYYY-MM-DD");

    const weatherHistory = await axios.get(
      `https://api.weatherapi.com/v1/history.json?key=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=${latitude},${longitude}&dt=${startDate}&end_dt=${endDate}`
    );
    //Store data in cache for 1 hour
    cache.set(cacheKey, weatherHistory.data, 3600);
    return weatherHistory.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getWeatherHistory,
};
