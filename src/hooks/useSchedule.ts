import { useState, useEffect } from "react";
import { request } from "@/lib/api";

// Предмет студента — то, что он сам добавляет
export interface Subject {
  id: number;
  user_id: number;
  name: string;          // Название предмета
  teacher: string;       // Преподаватель
  deadline: string;      // Дата сдачи работы (ISO: "2026-05-15")
  session_days: number;  // Дней до сессии (число, задаёт студент)
  color?: string;        // Hex-цвет метки (опционально)
  note?: string;         // Заметка (опционально)
  created_at: string;
  updated_at: string;
}

export type SubjectCreate = Omit<Subject, "id" | "user_id" | "created_at" | "updated_at">;
export type SubjectUpdate = Partial<SubjectCreate>;

// ─── API endpoints ───────────────────────────────────────────
//
// GET    /subjects
//   Headers: Authorization: Bearer <token>
//   Response: Subject[]
//
// POST   /subjects
//   Headers: Authorization: Bearer <token>
//   Body: { name, teacher, deadline, session_days, color?, note? }
//   Response: Subject
//
// PUT    /subjects/:id
//   Headers: Authorization: Bearer <token>
//   Body: { name?, teacher?, deadline?, session_days?, color?, note? }
//   Response: Subject
//
// DELETE /subjects/:id
//   Headers: Authorization: Bearer <token>
//   Response: { ok: true }
//
// ─────────────────────────────────────────────────────────────

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await request<Subject[]>("/subjects");
      setSubjects(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const create = async (body: SubjectCreate): Promise<Subject> => {
    const created = await request<Subject>("/subjects", { method: "POST", body });
    setSubjects((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, body: SubjectUpdate): Promise<Subject> => {
    const updated = await request<Subject>(`/subjects/${id}`, { method: "PUT", body });
    setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  };

  const remove = async (id: number) => {
    await request(`/subjects/${id}`, { method: "DELETE" });
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return { subjects, loading, error, create, update, remove, refetch: fetch };
}

// Вспомогательная: сколько дней до дедлайна
export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
}

// Вспомогательная: цвет срочности дедлайна
export function deadlineColor(days: number): string {
  if (days < 0) return "text-red-400";
  if (days <= 3) return "text-orange-400";
  if (days <= 7) return "text-yellow-400";
  return "text-green-400";
}
