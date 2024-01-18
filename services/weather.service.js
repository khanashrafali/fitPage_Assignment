import { locationModel } from "../model/index.js";
import axios from "axios";
import { helper } from "../utils/index.js";
import NodeCache from "node-cache";
const cache = new NodeCache();

helper.loadEnvFile();

const getWeather = async (locationId) => {
  try {
    const cacheKey = `weather-${locationId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const location = await locationModel.findOne({ _id: locationId });
    if (!location) throw helper.buildError("Location not found");
    const [longitude, latitude] = location.loc.coordinates;
    const weatherResponse = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
    );
    //Store data in cache for 1 hour
    cache.set(cacheKey, weatherResponse.data, 3600);
    return weatherResponse.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getWeather,
};
