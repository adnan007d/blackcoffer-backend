"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    PORT: zod_1.z.number().default(6969),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    throw new Error(parsedEnv.error.errors.join("\n"));
}
exports.env = parsedEnv.data;
