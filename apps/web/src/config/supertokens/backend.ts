import "server-only";
import { z } from "zod";
import { env } from "../environment";
import SuperTokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import SessionNode from "supertokens-node/recipe/session";
import { SMTPService } from "supertokens-node/recipe/emailpassword/emaildelivery";
import { SMTPService as EmailVerificationSMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";
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

const SupertokenSmtpInfoSchema = z.object({
  SUPERTOKENS_SMTP_HOST: z
    .string()
    .nonempty()
    .default(() => (env.isProduction ? "" : "localhost")),
  SUPERTOKENS_SMTP_PORT: z
    .number()
    .default(() => (env.isProduction ? 465 : 1025)),
});

const backendInfo = SupertokensBackendInfoSchema.parse(process.env);

const smtpInfo = SupertokenSmtpInfoSchema.parse(process.env);

const smtpSettings = {
  host: smtpInfo.SUPERTOKENS_SMTP_HOST,
  port: smtpInfo.SUPERTOKENS_SMTP_PORT,
  from: {
    name: appInfo.appName,
    email: "supertokens@example.com",
  },
  password: "supertokens",
};

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: backendInfo.SUPERTOKENS_CONNECTION_URL,
      apiKey: backendInfo.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPassword.init({
        emailDelivery: {
          service: new SMTPService({
            smtpSettings,
          }),
        },
      }),
      EmailVerification.init({
        mode: "REQUIRED",
        emailDelivery: {
          service: new EmailVerificationSMTPService({ smtpSettings }),
        },
      }),
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
