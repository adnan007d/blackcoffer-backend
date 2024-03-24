"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectorsXIntensity = void 0;
const data_1 = __importDefault(require("../../models/data"));
const util_1 = require("../../utils/util");
async function sectorsXIntensity(req, res) {
    const filter = (0, util_1.getFilter)({
        pestle: req.query.pestles,
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
                    intensity: { $sum: "$intensity" },
                },
            },
            {
                $project: {
                    sector: "$_id",
                    intensity: 1,
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
exports.sectorsXIntensity = sectorsXIntensity;
