import { Router } from "express";
import Data from "@/models/data";

const dataRouter = Router();

dataRouter.get("/", async (_req, res) => {
  const data = await Data.find({});
  return res.json(data);
});

export default dataRouter;
