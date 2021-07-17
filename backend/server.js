"use strict";

// NODE.JS IMPORTS
import express from "express";

// IMPORT MONGOOSE
import "./database/mongoose.js";

// ROUTES
import routes from "./routes/routes.js";

// PORT SELECTION
const PORT = 5000 || process.env.PORT;

// EXPRESS SETTUP
const app = express();

// ACCEPTING JSON REQUESTS
app.use(express.json());

// USING THESE ROUTES ON '/api'
app.use("/api", routes);

// FIRING UP THE SERVER
app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
