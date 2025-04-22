import "client-only";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { appInfo } from "./appInfo";
import type { useRouter } from "next/navigation";
import type { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init(),
      EmailVerification.init({
        mode: "REQUIRED",
      }),
      Session.init(),
    ],
    useShadowDom: false,
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName || "",
        assign: (url) => routerInfo.router?.push(url.toString()),
        setHref: (url) => routerInfo.router?.push(url.toString()),
      },
    }),
  };
};
