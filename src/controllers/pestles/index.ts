import type { Request, Response } from "express";
import Data from "@/models/data";

export async function getDistinctPestles(_req: Request, res: Response) {
  try {
    const pestle = await Data.find({ pestle: { $ne: "" } }).distinct("pestle");
    return res.json(pestle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
