import { Router } from "express";
import { historyController } from "../../controllers/index.js";
import validator from "./validator.js";

const router = Router();

router.get("/:location_id", validator.getWeatherHistory, historyController.getWeatherHistory);

export default router;
