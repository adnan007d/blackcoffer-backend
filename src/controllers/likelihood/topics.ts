import type { Request, Response } from "express";
import Data from "@/models/data";
import { getFilter } from "@/utils/util";

export async function likelihoodXTopics(req: Request, res: Response) {
  const filter = getFilter({
    sector: req.query.sectors,
    region: req.query.regions,
    source: req.query.sources,
    country: req.query.countries,
    topic: req.query.topics,
  });

  try {
    const data = await Data.aggregate([
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
