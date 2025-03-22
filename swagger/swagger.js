import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "../config/env.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            contact: {
                name: "Martin Rojas"
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/v1`,
            },
        ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJSDoc(options);

export default specs;