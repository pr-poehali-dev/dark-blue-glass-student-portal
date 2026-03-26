import { useState, useEffect } from "react";
import { request, saveToken, removeToken } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  group: string;
  email: string;
  avatar: string;   // вычисляется на фронте из initials(name), бек не возвращает
}

// POST /auth/register
// Body: { name, group, email, password }
// Response: { token: string, user: User }

// POST /auth/login
// Body: { email, password }
// Response: { token: string, user: User }

// GET /auth/me
// Headers: Authorization: Bearer <token>
// Response: User

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) { setLoading(false); return; }
    request<User>("/auth/me")
      .then((u) => setUser({ ...u, avatar: initials(u.name) }))
      .catch(() => removeToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    saveToken(res.token);
    setUser({ ...res.user, avatar: initials(res.user.name) });
    return res.user;
  };

  const register = async (name: string, group: string, email: string, password: string) => {
    const res = await request<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: { name, group, email, password },
    });
    saveToken(res.token);
    setUser({ ...res.user, avatar: initials(res.user.name) });
    return res.user;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return { user, loading, login, register, logout };
}

function initials(name: string): string {
  return name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "СТ";
}