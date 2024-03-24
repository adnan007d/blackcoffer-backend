"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intensityXPestles = void 0;
const data_1 = __importDefault(require("../../models/data"));
const util_1 = require("../../utils/util");
async function intensityXPestles(req, res) {
    const filter = (0, util_1.getFilter)({
        pestle: req.query.pestles,
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
                    pestle: { $ne: "" },
                    intensity: { $ne: null },
                },
            },
            {
                $group: {
                    _id: "$pestle",
                    intensity: { $sum: "$intensity" },
                    sector: { $addToSet: "$sector" }
                },
            },
            {
                $project: {
                    pestle: "$_id", // Rename the _id field to pestle
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
exports.intensityXPestles = intensityXPestles;
