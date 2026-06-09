const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body.detail === "string") {
        message = body.detail;
      } else {
        const parts: string[] = [];
        for (const [key, val] of Object.entries(body)) {
          const errors = Array.isArray(val) ? val.join(", ") : String(val);
          parts.push(key === "non_field_errors" ? errors : `${key}: ${errors}`);
        }
        if (parts.length) message = parts.join(" | ");
      }
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
