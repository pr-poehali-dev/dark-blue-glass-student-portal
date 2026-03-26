import { useState, useEffect } from "react";
import { request } from "@/lib/api";

export interface Lesson {
  id: number;
  group: string;
  weekday: string;
  time_start: string;
  time_end: string;
  subject: string;
  teacher: string;
  room: string;
  type: "Лекция" | "Практика" | "Лаб";
}

// GET /schedule?group=ИТ-301
// Headers: Authorization: Bearer <token>
// Response: Lesson[]

// Только для админа:

// POST /schedule
// Headers: Authorization: Bearer <token>
// Body: { group, weekday, time_start, time_end, subject, teacher, room, type }
// Response: Lesson

// PUT /schedule/:id
// Headers: Authorization: Bearer <token>
// Body: { group, weekday, time_start, time_end, subject, teacher, room, type }
// Response: Lesson

// DELETE /schedule/:id
// Headers: Authorization: Bearer <token>
// Response: { ok: true }

export function useSchedule(group?: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSchedule = async () => {
    if (!group) return;
    setLoading(true);
    try {
      const data = await request<Lesson[]>(`/schedule?group=${encodeURIComponent(group)}`);
      setLessons(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки расписания");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedule(); }, [group]);

  const createLesson = async (body: Omit<Lesson, "id">) => {
    const created = await request<Lesson>("/schedule", { method: "POST", body });
    setLessons((prev) => [...prev, created]);
    return created;
  };

  const updateLesson = async (id: number, body: Omit<Lesson, "id">) => {
    const updated = await request<Lesson>(`/schedule/${id}`, { method: "PUT", body });
    setLessons((prev) => prev.map((l) => (l.id === id ? updated : l)));
    return updated;
  };

  const deleteLesson = async (id: number) => {
    await request(`/schedule/${id}`, { method: "DELETE" });
    setLessons((prev) => prev.filter((l) => l.id !== id));
  };

  return { lessons, loading, error, createLesson, updateLesson, deleteLesson, refetch: fetchSchedule };
}
