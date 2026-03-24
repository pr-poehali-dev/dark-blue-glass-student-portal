import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Work {
  id: number;
  name: string;
  subject: string;
  size: string;
  type: string;
  date: string;
  status: "uploaded" | "reviewing" | "accepted";
}

const initialWorks: Work[] = [
  { id: 1, name: "Курсовая_БД_Морозов.pdf", subject: "Базы данных", size: "2.4 МБ", type: "pdf", date: "20 марта 2026", status: "reviewing" },
  { id: 2, name: "Лаб5_Python_Морозов.zip", subject: "Программирование", size: "856 КБ", type: "zip", date: "15 марта 2026", status: "accepted" },
  { id: 3, name: "Реферат_ОС_v2.docx", subject: "Операционные системы", size: "320 КБ", type: "docx", date: "10 марта 2026", status: "accepted" },
];

const typeIcon: Record<string, string> = {
  pdf: "FileText", zip: "FolderArchive", docx: "FileText",
  pptx: "Presentation", xlsx: "Sheet", jpg: "Image", png: "Image",
};

const typeStyle: Record<string, string> = {
  pdf: "text-red-600 bg-red-50 border-red-100",
  zip: "text-yellow-600 bg-yellow-50 border-yellow-100",
  docx: "text-blue-600 bg-blue-50 border-blue-100",
  pptx: "text-orange-600 bg-orange-50 border-orange-100",
  xlsx: "text-green-600 bg-green-50 border-green-100",
  jpg: "text-purple-600 bg-purple-50 border-purple-100",
  png: "text-purple-600 bg-purple-50 border-purple-100",
};

const statusMap = {
  uploaded: { label: "Загружено", color: "bg-gray-50 text-gray-600 border-gray-200" },
  reviewing: { label: "На проверке", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  accepted: { label: "Принято", color: "bg-green-50 text-green-700 border-green-200" },
};

export default function WorksTab() {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "file";
      const newWork: Work = {
        id: Date.now() + Math.random(),
        name: file.name,
        subject: "Загружено вручную",
        size: file.size > 1024 * 1024
          ? `${(file.size / 1024 / 1024).toFixed(1)} МБ`
          : `${(file.size / 1024).toFixed(0)} КБ`,
        type: ext,
        date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
        status: "uploaded",
      };
      setWorks((prev) => [newWork, ...prev]);
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-0.5">Мои работы</h2>
        <p className="text-gray-400 text-sm">{works.length} файлов загружено</p>
      </div>

      {/* Зона загрузки */}
      <div
        className={`rounded-2xl border-2 border-dashed transition-all duration-200 mb-5 cursor-pointer ${
          dragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className="py-8 flex flex-col items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
            dragging ? "bg-blue-100 border-blue-200" : "bg-gray-50 border-gray-200"
          }`}>
            <Icon name="Upload" size={22} className={dragging ? "text-blue-600" : "text-gray-400"} />
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-semibold text-sm">
              {dragging ? "Отпустите для загрузки" : "Перетащите файлы сюда"}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">или нажмите для выбора · PDF, DOCX, ZIP и другие форматы</p>
          </div>
          {!dragging && (
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all">
              Выбрать файлы
            </button>
          )}
        </div>
      </div>

      {/* Список */}
      <div className="space-y-2">
        {works.map((work, i) => {
          const ext = work.type;
          const iconName = typeIcon[ext] || "File";
          const colorClass = typeStyle[ext] || "text-gray-500 bg-gray-50 border-gray-100";

          return (
            <div
              key={work.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3.5 card-clean-hover animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                <Icon name={iconName} fallback="File" size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-semibold truncate">{work.name}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                  <span>{work.subject}</span>
                  <span className="text-gray-200">·</span>
                  <span>{work.size}</span>
                  <span className="text-gray-200">·</span>
                  <span>{work.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold hidden sm:block ${statusMap[work.status].color}`}>
                  {statusMap[work.status].label}
                </span>
                <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <Icon name="Download" size={13} />
                </button>
                <button
                  className="w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-all flex items-center justify-center text-gray-300 hover:text-red-500"
                  onClick={() => setWorks((prev) => prev.filter((w) => w.id !== work.id))}
                >
                  <Icon name="Trash2" size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
