import mongoose from "mongoose";
import app, { PORT } from "@/app";
import { env } from "@/env";

async function main() {
  await mongoose.connect(env.DATABASE_URL);
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

main().catch((error) => console.error(error));
