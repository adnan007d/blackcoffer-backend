import type { Request, Response } from "express";
import Data from "@/models/data";
export async function getDistinctTopics(_req: Request, res: Response) {
  try {
    const topics = await Data.find({topic: {$ne: ""}}).distinct("topic");
    return res.json(topics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
