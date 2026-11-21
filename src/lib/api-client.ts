// ============================================================
// src/lib/api-client.ts
// ============================================================
// Central HTTP client for Backend API calls (NestJS / REST).
// - Reads NEXT_PUBLIC_API_URL from environment when configured.
// - Automatically attaches Authorization: Bearer <token> when available.
// - Throws ApiError with structured message on non-2xx responses.
// ============================================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError(
      0,
      "Backend API is not configured. Running in local mock mode.",
    );
  }

  const { body, headers: customHeaders, ...rest } = options;

  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(
      response.status,
      `API Error ${response.status}: ${response.statusText}`,
      errorData,
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
