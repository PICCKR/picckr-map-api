import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API MAP DOCS",
      version: "1.0.0",
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
  apis: ["**/routers/*.js", "**/routers/**/*.js"],
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
