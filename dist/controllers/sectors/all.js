"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectorsXAll = void 0;
const data_1 = __importDefault(require("../../models/data"));
const util_1 = require("../../utils/util");
async function sectorsXAll(req, res) {
    const filter = (0, util_1.getFilter)({
        topic: req.query.topics,
        sector: req.query.sectors,
    });
    try {
        const data = await data_1.default.aggregate([
            {
                $match: {
                    sector: { $ne: "" },
                    intensity: { $ne: null },
                    ...filter,
                },
            },
            {
                $group: {
                    _id: "$sector",
                    avgIntensity: { $avg: "$intensity" },
                    avgRelevance: { $avg: "$relevance" },
                    avgLikelihood: { $avg: "$likelihood" },
                },
            },
            {
                $project: {
                    sector: "$_id",
                    avgIntensity: 1,
                    avgRelevance: 1,
                    avgLikelihood: 1,
                    _id: 0,
                },
            },
        ]);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.sectorsXAll = sectorsXAll;
