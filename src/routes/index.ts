import { Router } from "express";
import { intensityXTopics } from "@/controllers/intensity/topics";
import { intensityXPestles } from "@/controllers/intensity/pestles";
import { getDistinctSectors } from "@/controllers/sectors";
import { getDistinctTopics } from "@/controllers/topics";
import { getDistinctPestles } from "@/controllers/pestles";
import { getDistinctInsights } from "@/controllers/insights";
import { sectorsXIntensity } from "@/controllers/sectors/intensity";
import { sectorsXAll } from "@/controllers/sectors/all";

const v1Router = Router();

v1Router.get("/", (_req, res) => {
  res.send("Hello from v1");
});

v1Router.get("/intensity/topics", intensityXTopics);
v1Router.get("/intensity/pestle", intensityXPestles);
v1Router.get("/sectors", getDistinctSectors);
v1Router.get("/sectors/intensity", sectorsXIntensity);
v1Router.get("/sectors/all", sectorsXAll);
v1Router.get("/topics", getDistinctTopics);
v1Router.get("/pestles", getDistinctPestles);
v1Router.get("/insights", getDistinctInsights);

export { v1Router };
