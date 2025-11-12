import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverApi<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
      ...options?.headers,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/auth/login");
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
