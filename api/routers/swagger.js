import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";


dotenv.config();



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


export const SwaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // swagger page
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(SwaggerSpec)
  );

  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
