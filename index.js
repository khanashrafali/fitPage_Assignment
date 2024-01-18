import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorController } from "./controllers/index.js";
import appRoutes from "./routes/routes.js";
import { DB, helper } from "./utils/index.js";

helper.loadEnvFile();

const app = express();
let corsOption = { origin: "*" };
app.use(cors(corsOption));

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/v1", appRoutes);
app.use(errorController.errorHandler);

// create connection to mongodb
DB.then((rs) => {
  console.log("DB is connected.");
  app.listen(process.env.PORT, async () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
}).catch((err) => console.log(JSON.stringify(err)));
