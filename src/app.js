import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "js-yaml";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "app-swagger.yaml");

const loadSwaggerDocument = async () => {
  try {
    const fileContent = await readFile(filePath, "utf8");
    return YAML.load(fileContent);
  } catch (error) {
    console.error("Error loading Swagger document:", error);
    return null;
  }
};

const app = express();
dotenv.config();
const { URI_DB, PORT } = process.env;

app.use(cors());
app.use(express.json());

// Down documents swagger
loadSwaggerDocument().then((swaggerDocument) => {
  if (swaggerDocument) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } else {
    console.error(
      "Failed to load Swagger document. API documentation will not be available."
    );
  }
});

// Connect mongoDB
connect(URI_DB)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((err) => {
    console.log("Connect DB failed!", err);
  });

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Project running port ${PORT}`);
});
