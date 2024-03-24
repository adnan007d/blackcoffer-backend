import { z } from "zod";
import { config } from "dotenv";

config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.number().default(6969),
});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.errors.join("\n"));
}

export const env = parsedEnv.data;
