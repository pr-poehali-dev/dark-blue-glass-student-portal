// Базовый URL бэкенда — меняй здесь при деплое
export const BASE_URL = "http://localhost:8080";

function getToken(): string | null {
  return localStorage.getItem("jwt");
}

export function saveToken(token: string) {
  localStorage.setItem("jwt", token);
}

export function removeToken() {
  localStorage.removeItem("jwt");
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  isFormData?: boolean;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, isFormData = false } = options;
  const token = getToken();

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData
      ? (body as FormData)
      : body
      ? JSON.stringify(body)
      : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Ошибка сервера" }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}
