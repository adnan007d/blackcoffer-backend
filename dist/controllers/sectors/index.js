"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistinctSectors = void 0;
const data_1 = __importDefault(require("../../models/data"));
async function getDistinctSectors(_req, res) {
    try {
        const sectors = await data_1.default.find({ sector: { $ne: "" } }).distinct("sector");
        return res.json(sectors);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.getDistinctSectors = getDistinctSectors;
