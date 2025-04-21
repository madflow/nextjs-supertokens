import { ProtectedPage } from "@/components/auth/protected-page";

export default async function About() {
  return (
    <main className="container">
      <ProtectedPage>
        <h1>Private page</h1>
      </ProtectedPage>
    </main>
  );
}
