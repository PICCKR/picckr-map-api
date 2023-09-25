import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const DESCRIPTION = `

## 1. Workflow

## 2. Entities

## 3. Possible Functions

`;

const options = {
  definition: {
    openapi: "3.0.2",
    info: {
      title: "PicckR Tracker REST API",
      version: "2",
      description: DESCRIPTION,
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
        url: "http://localhost:5050/",
        description: "local",
      },
      {
        url: "https://picckr-map-api.vercel.app/",
        description: "online",
      },
    ],
  },
  apis: ["**/routers/*.yaml", "**/routers/**/*.yaml"],
};

export const SwaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
