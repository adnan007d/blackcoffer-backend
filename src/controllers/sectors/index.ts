import type { Request, Response } from "express";
import Data from "@/models/data";

export async function getDistinctSectors(_req: Request, res: Response) {
  try {
    const sectors = await Data.find({ sector: { $ne: "" } }).distinct("sector");
    return res.json(sectors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
