import "server-only";
import { z } from "zod";
import { env } from "../environment";
import SuperTokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import type { TypeInput } from "supertokens-node/types";
import { appInfo } from "@/config/supertokens/appInfo";

const SupertokensBackendInfoSchema = z.object({
  SUPERTOKENS_CONNECTION_URL: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "http://localhost:3567")),
  SUPERTOKENS_API_KEY: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "secret-api-key")),
});

const backendInfo = SupertokensBackendInfoSchema.parse(process.env);

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: backendInfo.SUPERTOKENS_CONNECTION_URL,
      apiKey: backendInfo.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init(),
      SessionNode.init(),
      Dashboard.init(),
      UserRoles.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
