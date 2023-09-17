import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Router } from "express";

const swaggerRouter = Router();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.2",
    info: {
      title: "REST API PicckR map",
      version: "1.1.0",
      description:
        "This is the REST API for PicckR map to manage orders through all the process from ordering, tracking and delivery",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: process.env.MODE == "DEV" ? "http://localhost:5050/" : "https://picckr-rest-api.vercel.app/",
        description: process.env.MODE == "DEV" ? "PicckR REST API on Local Machine" : "PicckR REST API on Vercel",
      },
    ],
  },
  apis: ["**/routers/*.yaml", "**/routers/**/*.yaml"],
};


const SwaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // swagger page
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(SwaggerSpec)
  );

  // Save swagger docs .json
  swaggerRouter.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(SwaggerSpec);
  });
  
  swaggerRouter.get("/assets/swagger.json", (req, res) => {
    const jsonFilePath = path.join(__dirname, "../../assets", "swagger.json");
    // Send the JSON file as a response
    res.sendFile(jsonFilePath);
  });

  app.use("/swagger", swaggerRouter);

  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
