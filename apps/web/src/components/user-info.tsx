"use client";

import { signOut } from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export function UserInfo() {
  const session = useSessionContext();
  async function onLogout() {
    await signOut();
    window.location.href = "/auth"; // or redirect to wherever the login page is
  }

  if (session.loading) {
    return (
      <div className="card">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>User Info</h3>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      {session?.doesSessionExist && (
        <button className="btn" type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </div>
  );
}
