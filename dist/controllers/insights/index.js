"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistinctInsights = void 0;
const data_1 = __importDefault(require("../../models/data"));
async function getDistinctInsights(_req, res) {
    try {
        const data = await data_1.default.find({ insight: { $ne: "" } }).distinct("insight");
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.getDistinctInsights = getDistinctInsights;
