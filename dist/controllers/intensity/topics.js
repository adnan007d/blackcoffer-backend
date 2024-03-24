"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intensityXTopics = void 0;
const data_1 = __importDefault(require("../../models/data"));
const util_1 = require("../../utils/util");
async function intensityXTopics(req, res) {
    const filter = (0, util_1.getFilter)({
        topic: req.query.topics,
        sector: req.query.sectors,
    });
    try {
        const data = await data_1.default.aggregate([
            {
                $match: {
                    ...filter,
                },
            },
            {
                $match: {
                    topic: { $ne: "" },
                    intensity: { $ne: null },
                },
            },
            {
                $group: {
                    _id: "$topic",
                    intensity: { $sum: "$intensity" },
                    sector: { $addToSet: "$sector" }
                },
            },
            {
                $project: {
                    topic: "$_id", // Rename the _id field to topic
                    intensity: 1, // Include the total field
                    _id: 0, // Exclude the _id field
                    sector: 1,
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
exports.intensityXTopics = intensityXTopics;
