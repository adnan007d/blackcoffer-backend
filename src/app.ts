import express from "express";
import { env } from "@/env";
import dataRouter from "@/routes/data";

const app = express();

const PORT = env.PORT || 6969;

app.get("/", (_req, res) => {
  res.send("Hello World");
});

const v1Router = express.Router();


v1Router.get("/", (_req, res) => {
  res.send("Hello from v1");
});

v1Router.use("/data", dataRouter)

app.use("/v1", v1Router);

export default app;
export { PORT };
