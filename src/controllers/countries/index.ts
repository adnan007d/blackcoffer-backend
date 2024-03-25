import type { Request, Response } from "express";
import Data from "@/models/data";

export async function getDistinctCountries(_req: Request, res: Response) {
  try {
    const data = await Data.find({ country: { $ne: "" } }).distinct("country");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
