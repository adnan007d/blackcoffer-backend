import type { Request, Response } from "express";
import Data from "@/models/data";
import { getFilter } from "@/utils/util";

export async function sectorsXIntensity(req: Request, res: Response) {
  const filter = getFilter({
    pestle: req.query.pestles,
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
