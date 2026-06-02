require("dotenv").config();

const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");

const {connectDB} = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "API Documentation",
        customCss: `
        .topbar-wrapper { display: none; }
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .info .title { color: #3b4151; }
    `,
    })
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});