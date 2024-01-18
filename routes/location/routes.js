import { Router } from "express";
import { locationController } from "../../controllers/index.js";
import validator from "./validator.js";

const router = Router();

router.post("", validator.addLocation, locationController.addLocation);
router.get("", validator.getLocations, locationController.getLocations);
router.get("/:location_id", validator.getLocation, locationController.getLocation);
router.put("/:location_id", validator.updateLocation, locationController.updateLocation);
router.delete("/:location_id", validator.deleteLocation, locationController.deleteLocation);

export default router;
