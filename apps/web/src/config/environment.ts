import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvironmentConfigSchema = z.object({
  NODE_ENV: z.coerce.string().toLowerCase().default("development"),
  PORT: z.coerce.number().default(3000),
});
type EnvironmentConfig = z.infer<typeof EnvironmentConfigSchema> & {
  isProduction: boolean;
};

export const env: EnvironmentConfig = {
  ...EnvironmentConfigSchema.parse(process.env),
  get isProduction() {
    return this.NODE_ENV === "production";
  },
} as const;
