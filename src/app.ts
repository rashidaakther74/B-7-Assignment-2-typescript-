import express from "express";

import { authRoutes } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issues.route";
import logger from "./middleware/logger";

const app = express();

app.use(express.json());

app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Assignment 2 API is running"
  });
});

export default app;