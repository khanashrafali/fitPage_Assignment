import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    loc: {
      type: {
        type: String,
        enum: ["Point"], // 'location.type' must be 'Point'[lng,lat]
        default: "Point",
      },
      coordinates: { type: [], default: [0.0, 0.0] },
    },
  },
  { timestamps: true }
);

export default mongoose.model("locations", LocationSchema);
