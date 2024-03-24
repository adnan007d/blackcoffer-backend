import type { Request, Response } from "express";
import Data from "@/models/data";
import { getFilter } from "@/utils/util";

export async function sectorsXAll(req: Request, res: Response) {
  const filter = getFilter({
    topic: req.query.topics,
    sector: req.query.sectors,
  });

  try {
    const data = await Data.aggregate([
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
