import type { Request, Response } from "express";
import Data from "@/models/data";
import { getFilter } from "@/utils/util";

export async function intensityXPestles(req: Request, res: Response) {

  const filter = getFilter({
    pestle: req.query.pestles,
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
          pestle: { $ne: "" },
          intensity: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$pestle",
          intensity: { $sum: "$intensity" },
          sector: { $addToSet: "$sector"}
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
