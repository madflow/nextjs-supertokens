import { z } from "zod";
import { env } from "../environment";

const SupertokensAppInfoSchema = z.object({
  SUPERTOKENS_APP_NAME: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "Next.js Supertokens")),
  SUPERTOKENS_API_DOMAIN: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "http://localhost:3000")),
  SUPERTOKENS_WEBSITE_DOMAIN: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "http://localhost:3000")),
});

const config = SupertokensAppInfoSchema.parse(process.env);

export const appInfo = {
  appName: config.SUPERTOKENS_APP_NAME,
  apiDomain: config.SUPERTOKENS_API_DOMAIN,
  websiteDomain: config.SUPERTOKENS_WEBSITE_DOMAIN,
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
} as const;
