"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistinctTopics = void 0;
const data_1 = __importDefault(require("../../models/data"));
async function getDistinctTopics(_req, res) {
    try {
        const topics = await data_1.default.find({ topic: { $ne: "" } }).distinct("topic");
        return res.json(topics);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.getDistinctTopics = getDistinctTopics;
