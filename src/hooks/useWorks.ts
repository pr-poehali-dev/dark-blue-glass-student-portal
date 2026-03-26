import { useState, useEffect } from "react";
import { request, BASE_URL } from "@/lib/api";

export interface Work {
  id: number;
  name: string;
  subject: string;
  size: string;
  type: string;
  status: "uploaded" | "reviewing" | "accepted";
  file_url: string;
  created_at: string;
}

// GET /works
// Headers: Authorization: Bearer <token>
// Response: Work[]

// POST /works  (multipart/form-data)
// Headers: Authorization: Bearer <token>
// Fields: files[] (multiple), subject (string)
// Response: Work[]  — массив добавленных работ

// PATCH /works/:id/status
// Headers: Authorization: Bearer <token>
// Body: { status: "uploaded" | "reviewing" | "accepted" }
// Response: Work

// DELETE /works/:id
// Headers: Authorization: Bearer <token>
// Response: { ok: true }

export function useWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorks = async () => {
    setLoading(true);
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

  const uploadWorks = async (files: File[], subject: string) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("files[]", f));
    fd.append("subject", subject);
    const added = await request<Work[]>("/works", { method: "POST", body: fd, isFormData: true });
    setWorks((prev) => [...added, ...prev]);
  };

  const updateStatus = async (id: number, status: Work["status"]) => {
    const updated = await request<Work>(`/works/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
    setWorks((prev) => prev.map((w) => (w.id === id ? updated : w)));
  };

  const deleteWork = async (id: number) => {
    await request(`/works/${id}`, { method: "DELETE" });
    setWorks((prev) => prev.filter((w) => w.id !== id));
  };

  const downloadUrl = (work: Work) =>
    work.file_url.startsWith("http") ? work.file_url : `${BASE_URL}${work.file_url}`;

  return { works, loading, error, uploadWorks, updateStatus, deleteWork, downloadUrl };
}
