import { getSession } from "next-auth/react";

export async function fetchWithToken(url: string, options: RequestInit = {}) {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (res.status === 401) {
    // Token has expired. Trigger a session refresh.
    await getSession({ triggerEvent: true });
    // Retry the request
    return fetchWithToken(url, options);
  }

  return res;
}
