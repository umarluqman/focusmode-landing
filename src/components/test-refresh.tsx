"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function TestRefresh() {
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const fetchAccessToken = async () => {
    const res = await fetch("/api/test-refresh");
    const data = await res.json();
    setAccessToken(data.accessToken);
  };

  useEffect(() => {
    if (session) {
      fetchAccessToken();
      const interval = setInterval(fetchAccessToken, 10000); // Fetch every 10 seconds
      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <div>
      <h2>Access Token Test</h2>
      <p>Current Access Token: {accessToken}</p>
    </div>
  );
}
