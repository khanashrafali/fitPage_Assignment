import { Router } from "express";
import { locationRoutes, weatherRoutes, historyRoutes } from "./index.js";
import { errorController } from "../controllers/index.js";
import middleware from "../middleware/rateLimit.js";

const router = Router();

router.use("/locations", locationRoutes);
router.use("/weather", middleware.weatherApiLimiter, weatherRoutes);
router.use("/history", middleware.historyApiLimiter, historyRoutes);

router.use("/*", errorController.handle404);

export default router;
