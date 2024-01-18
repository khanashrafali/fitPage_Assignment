import { Router } from "express";
import { weatherController } from "../../controllers/index.js";
import validator from "./validator.js";

const router = Router();

router.get("/:location_id", validator.getWeather, weatherController.getWeather);

export default router;
