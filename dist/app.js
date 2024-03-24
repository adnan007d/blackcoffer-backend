"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = env_1.env.PORT || 6969;
exports.PORT = PORT;
app.get("/", (_req, res) => {
    res.send("Hello World");
});
app.use("/api/v1", routes_1.v1Router);
exports.default = app;
