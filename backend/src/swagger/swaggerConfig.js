const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "APIs Documentation",
            version: "1.0.0",
            description: "API Documentation for the application",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],
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

    apis: ["./src/routes/*.js"], // files li fihom docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;