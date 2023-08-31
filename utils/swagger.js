import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.2",
    info: {
      title: "REST API PicckR map",
      version: "1.0.0",
      description:
        "This is the REST API for PicckR map to manage orders through all the process from ordering, tracking and delivery",
    },
    basePath: "/api",
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
  },
  apis: ["**/routers/*.yaml", "**/routers/**/*.yaml"],
};

const SwaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

  // docs in json format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(SwaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
