import type { Request, Response } from "express";
import Data from "@/models/data";

export async function getDistinctInsights(_req: Request, res: Response) {
  try {
    const data = await Data.find({ insight: { $ne: "" } }).distinct("insight");
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
