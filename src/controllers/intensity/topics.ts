import type { Request, Response } from "express";
import Data from "@/models/data";
import { getFilter } from "@/utils/util";

export async function intensityXTopics(req: Request, res: Response) {

  const filter = getFilter({
    topic: req.query.topics,
    sector: req.query.sectors,
  });

  try {
    const data = await Data.aggregate([
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
          sector: { $addToSet: "$sector"}
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
