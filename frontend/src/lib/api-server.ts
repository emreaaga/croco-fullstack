export async function apiServer(path: string, options: RequestInit = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const res = await fetch(`${baseURL}${path}`, {
    ...options,
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) return new Response(null, { status: 401 });

  return res;
}
