import type { Request, Response } from "express";
import Data from "@/models/data";

export async function getDistinctSources(_req: Request, res: Response) {
  try {
    const data = await Data.find({ source: { $ne: "" } }).distinct("source");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
