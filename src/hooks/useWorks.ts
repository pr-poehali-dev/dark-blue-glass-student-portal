import { useState, useEffect } from "react";
import { request, BASE_URL } from "@/lib/api";

export type WorkStatus = "uploaded" | "reviewing" | "accepted" | "rejected";

export interface Work {
  id: number;
  user_id: number;
  subject_id: number | null;  // ID предмета из /subjects (может быть null)
  subject_name: string;       // Название предмета (денормализованное для удобства)
  name: string;               // Имя файла
  size: string;               // "2.4 MB"
  type: string;               // "pdf", "docx", ...
  status: WorkStatus;
  file_url: string;           // Относительный или абсолютный URL
  created_at: string;         // ISO datetime
}

// ─── API endpoints ───────────────────────────────────────────
//
// GET  /works
//   Headers: Authorization: Bearer <token>
//   Response: Work[]
//
// POST /works  (multipart/form-data)
//   Headers: Authorization: Bearer <token>
//   Fields:
//     files[]       — один или несколько файлов
//     subject_id    — ID предмета (число, строка)
//     subject_name  — название предмета (строка, fallback если нет subject_id)
//   Response: Work[]  — массив добавленных работ
//
// PATCH /works/:id/status
//   Headers: Authorization: Bearer <token>
//   Body: { status: "uploaded" | "reviewing" | "accepted" | "rejected" }
//   Response: Work
//
// DELETE /works/:id
//   Headers: Authorization: Bearer <token>
//   Response: { ok: true }
//
// ─────────────────────────────────────────────────────────────

export function useWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await request<Work[]>("/works");
      setWorks(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWorks(); }, []);

  const uploadWorks = async (
    files: File[],
    subjectName: string,
    subjectId?: number | null,
  ) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("files[]", f));
    fd.append("subject_name", subjectName);
    if (subjectId != null) fd.append("subject_id", String(subjectId));
    const added = await request<Work[]>("/works", { method: "POST", body: fd, isFormData: true });
    setWorks((prev) => [...added, ...prev]);
    return added;
  };

  const updateStatus = async (id: number, status: WorkStatus) => {
    const updated = await request<Work>(`/works/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
    setWorks((prev) => prev.map((w) => (w.id === id ? updated : w)));
    return updated;
  };

  const deleteWork = async (id: number) => {
    await request(`/works/${id}`, { method: "DELETE" });
    setWorks((prev) => prev.filter((w) => w.id !== id));
  };

  const downloadUrl = (work: Work) =>
    work.file_url.startsWith("http") ? work.file_url : `${BASE_URL}${work.file_url}`;

  return { works, loading, error, uploadWorks, updateStatus, deleteWork, downloadUrl, refetch: fetchWorks };
}
