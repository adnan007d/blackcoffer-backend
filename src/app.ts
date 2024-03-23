import express from "express";
import cors from "cors";
import { env } from "@/env";
import { v1Router } from "./routes";

const app = express();
app.use(cors());

const PORT = env.PORT || 6969;

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", v1Router);

export default app;
export { PORT };
