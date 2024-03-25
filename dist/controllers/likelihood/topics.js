"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likelihoodXTopics = void 0;
const data_1 = __importDefault(require("../../models/data"));
const util_1 = require("../../utils/util");
async function likelihoodXTopics(req, res) {
    const filter = (0, util_1.getFilter)({
        sector: req.query.sectors,
        region: req.query.regions,
        source: req.query.sources,
        country: req.query.countries,
        topic: req.query.topics,
    });
    try {
        const data = await data_1.default.aggregate([
            {
                $match: filter,
            },
            {
                $match: {
                    likelihood: { $ne: null },
                    topic: { $ne: "" },
                },
            },
            {
                $group: {
                    _id: "$topic",
                    likelihood: { $sum: "$likelihood" },
                },
            },
            {
                $project: {
                    topic: "$_id",
                    likelihood: 1,
                    _id: 0,
                },
            },
        ]);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.likelihoodXTopics = likelihoodXTopics;
