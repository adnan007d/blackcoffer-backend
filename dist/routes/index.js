"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = require("express");
const topics_1 = require("../controllers/intensity/topics");
const pestles_1 = require("../controllers/intensity/pestles");
const sectors_1 = require("../controllers/sectors");
const topics_2 = require("../controllers/topics");
const pestles_2 = require("../controllers/pestles");
const insights_1 = require("../controllers/insights");
const intensity_1 = require("../controllers/sectors/intensity");
const all_1 = require("../controllers/sectors/all");
const topics_3 = require("../controllers/likelihood/topics");
const regions_1 = require("../controllers/regions");
const sources_1 = require("../controllers/sources");
const countries_1 = require("../controllers/countries");
const v1Router = (0, express_1.Router)();
exports.v1Router = v1Router;
v1Router.get("/", (_req, res) => {
    res.send("Hello from v1");
});
v1Router.get("/intensity/topics", topics_1.intensityXTopics);
v1Router.get("/intensity/pestle", pestles_1.intensityXPestles);
v1Router.get("/sectors", sectors_1.getDistinctSectors);
v1Router.get("/sectors/intensity", intensity_1.sectorsXIntensity);
v1Router.get("/sectors/all", all_1.sectorsXAll);
v1Router.get("/topics", topics_2.getDistinctTopics);
v1Router.get("/pestles", pestles_2.getDistinctPestles);
v1Router.get("/insights", insights_1.getDistinctInsights);
v1Router.get("/likelihood/topics", topics_3.likelihoodXTopics);
v1Router.get("/regions", regions_1.getDistinctRegions);
v1Router.get("/sources", sources_1.getDistinctSources);
v1Router.get("/countries", countries_1.getDistinctCountries);
