import { ProtectedPage } from "@/components/auth/protected-page";
import { UserInfo } from "@/components/user-info";

export default function Home() {
  return (
    <main className="container">
      <ProtectedPage>
        <UserInfo />
      </ProtectedPage>
    </main>
  );
}
