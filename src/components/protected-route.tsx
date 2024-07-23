import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/sign-in"); // Redirect to sign-in if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return session ? <>{children}</> : null;
}
