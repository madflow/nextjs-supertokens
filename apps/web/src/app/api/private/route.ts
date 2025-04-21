import { withSession } from "supertokens-node/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/supertokens/backend";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    return NextResponse.json({
      note: "Private api route",
      userId: session.getUserId(),
      sessionHandle: session.getHandle(),
      accessTokenPayload: session.getAccessTokenPayload(),
    });
  });
}
