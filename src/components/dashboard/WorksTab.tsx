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
  {
    id: 1,
    name: "Курсовая_БД_Морозов.pdf",
    subject: "Базы данных",
    size: "2.4 МБ",
    type: "pdf",
    date: "20 марта 2026",
    status: "reviewing",
  },
  {
    id: 2,
    name: "Лаб5_Python_Морозов.zip",
    subject: "Программирование",
    size: "856 КБ",
    type: "zip",
    date: "15 марта 2026",
    status: "accepted",
  },
  {
    id: 3,
    name: "Реферат_ОС_v2.docx",
    subject: "Операционные системы",
    size: "320 КБ",
    type: "docx",
    date: "10 марта 2026",
    status: "accepted",
  },
];

const typeIcon: Record<string, string> = {
  pdf: "FileText",
  zip: "FolderArchive",
  docx: "FileText",
  pptx: "Presentation",
  xlsx: "Sheet",
  jpg: "Image",
  png: "Image",
};

const typeColor: Record<string, string> = {
  pdf: "text-red-400 bg-red-500/10 border-red-500/20",
  zip: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  docx: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  pptx: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  xlsx: "text-green-400 bg-green-500/10 border-green-500/20",
  jpg: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  png: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

const statusMap = {
  uploaded: { label: "Загружено", color: "text-blue-300 bg-blue-500/10 border-blue-500/25" },
  reviewing: { label: "На проверке", color: "text-yellow-300 bg-yellow-500/10 border-yellow-500/25" },
  accepted: { label: "Принято", color: "text-green-300 bg-green-500/10 border-green-500/25" },
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
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Мои работы</h2>
        <p className="text-muted-foreground text-sm">Загруженные файлы и проекты — {works.length} файлов</p>
      </div>

      {/* Зона загрузки */}
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 mb-6 cursor-pointer ${
          dragging
            ? "border-blue-400/60 bg-blue-500/10"
            : "border-white/15 hover:border-blue-400/40 hover:bg-white/5"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="py-10 flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
            dragging ? "bg-blue-500/20 scale-110" : "glass"
          }`}>
            <Icon name="Upload" size={24} className={dragging ? "text-blue-400" : "text-muted-foreground"} />
          </div>
          <div className="text-center">
            <p className="text-white font-medium text-sm">
              {dragging ? "Отпустите файл для загрузки" : "Перетащите файлы или нажмите для выбора"}
            </p>
            <p className="text-muted-foreground text-xs mt-1">PDF, DOCX, ZIP, PNG, JPG — любые форматы</p>
          </div>
          {!dragging && (
            <button className="px-5 py-2 rounded-xl text-sm font-medium text-white border border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 transition-all">
              Выбрать файлы
            </button>
          )}
        </div>
      </div>

      {/* Список файлов */}
      <div className="space-y-3">
        {works.map((work, i) => {
          const ext = work.type;
          const iconName = typeIcon[ext] || "File";
          const colorClass = typeColor[ext] || "text-gray-400 bg-gray-500/10 border-gray-500/20";

          return (
            <div
              key={work.id}
              className="glass glass-hover rounded-2xl p-4 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              {/* Иконка файла */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                <Icon name={iconName} fallback="File" size={18} />
              </div>

              {/* Инфо */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{work.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{work.subject}</span>
                  <span>·</span>
                  <span>{work.size}</span>
                  <span>·</span>
                  <span>{work.date}</span>
                </div>
              </div>

              {/* Статус */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium hidden sm:block ${statusMap[work.status].color}`}>
                  {statusMap[work.status].label}
                </span>
                <button className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-all flex items-center justify-center text-muted-foreground hover:text-white">
                  <Icon name="Download" size={14} />
                </button>
                <button
                  className="w-8 h-8 rounded-lg hover:bg-red-500/10 transition-all flex items-center justify-center text-muted-foreground hover:text-red-400"
                  onClick={() => setWorks((prev) => prev.filter((w) => w.id !== work.id))}
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
