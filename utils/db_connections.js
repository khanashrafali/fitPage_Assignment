import mongoose from "mongoose";
import { helper } from "./index.js";

helper.loadEnvFile();
// create connection to mongodb
export default mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
