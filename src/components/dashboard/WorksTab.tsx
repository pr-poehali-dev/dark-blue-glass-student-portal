import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { useWorks, Work } from "@/hooks/useWorks";

const typeIcon: Record<string, string> = {
  pdf: "FileText", zip: "FolderArchive", rar: "FolderArchive", "7z": "FolderArchive",
  docx: "FileText", doc: "FileText", pptx: "Presentation", xlsx: "Sheet",
  jpg: "Image", png: "Image", jpeg: "Image",
};

const typeStyle: Record<string, string> = {
  pdf: "text-red-400 bg-red-500/10 border-red-500/20",
  zip: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  rar: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  "7z": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  docx: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  doc: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  pptx: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  xlsx: "text-green-400 bg-green-500/10 border-green-500/20",
  jpg: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  png: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

const statusMap: Record<Work["status"], { label: string; color: string }> = {
  uploaded:  { label: "Загружено",   color: "bg-white/5 text-white/50 border-white/10" },
  reviewing: { label: "На проверке", color: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30" },
  accepted:  { label: "Принято",     color: "bg-green-500/10 text-green-300 border-green-500/30" },
};

const STATUS_CYCLE: Work["status"][] = ["uploaded", "reviewing", "accepted"];

export default function WorksTab() {
  const { works, loading, error, uploadWorks, updateStatus, deleteWork, downloadUrl } = useWorks();
  const [dragging, setDragging] = useState(false);
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const sub = subject.trim() || "Без предмета";
    setUploading(true);
    setUploadError("");
    try {
      await uploadWorks(Array.from(files), sub);
      setSubject("");
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  const cycleStatus = (work: Work) => {
    const idx = STATUS_CYCLE.indexOf(work.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    updateStatus(work.id, next);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Мои работы</h2>
        <p className="text-muted-foreground text-sm">{works.length} файлов загружено</p>
      </div>

      {/* Поле предмета */}
      <div className="mb-3">
        <div className="relative">
          <Icon name="BookOpen" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Предмет (необязательно)"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>
      </div>

      {/* Зона загрузки */}
      <div
        className={`rounded-2xl border-2 border-dashed transition-all duration-200 mb-5 cursor-pointer ${
          dragging ? "border-blue-400 bg-blue-500/10" : "border-white/10 hover:border-blue-500/40 hover:bg-white/3"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className="py-8 flex flex-col items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
            dragging ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
          }`}>
            {uploading
              ? <Icon name="Loader2" size={22} className="text-blue-400 animate-spin" />
              : <Icon name="Upload" size={22} className={dragging ? "text-blue-400" : "text-muted-foreground"} />
            }
          </div>
          <div className="text-center">
            <p className="text-white/80 font-semibold text-sm">
              {uploading ? "Загружаем..." : dragging ? "Отпустите для загрузки" : "Перетащите файлы сюда"}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">PDF, DOCX, ZIP, RAR и другие · несколько файлов сразу</p>
          </div>
          {!dragging && !uploading && (
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all">
              Выбрать файлы
            </button>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
          <Icon name="AlertCircle" size={15} />{uploadError}
        </div>
      )}

      {/* Список */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-3">
          <Icon name="Loader2" size={20} className="animate-spin" />
          <span className="text-sm">Загружаем работы...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
          <Icon name="AlertCircle" size={15} />{error}
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Работ пока нет</div>
      ) : (
        <div className="space-y-2">
          {works.map((work, i) => {
            const ext = work.type;
            const iconName = typeIcon[ext] || "File";
            const colorClass = typeStyle[ext] || "text-white/40 bg-white/5 border-white/10";
            const st = statusMap[work.status];

            return (
              <div
                key={work.id}
                className="glass glass-hover rounded-2xl p-4 flex items-center gap-3.5 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                  <Icon name={iconName} fallback="File" size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{work.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                    <span>{work.subject}</span>
                    <span className="text-white/10">·</span>
                    <span>{work.size}</span>
                    <span className="text-white/10">·</span>
                    <span>{new Date(work.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => cycleStatus(work)}
                    className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold hidden sm:block transition-all hover:opacity-80 ${st.color}`}
                    title="Нажми для смены статуса"
                  >
                    {st.label}
                  </button>
                  <a
                    href={downloadUrl(work)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg glass hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center text-muted-foreground hover:text-white"
                  >
                    <Icon name="Download" size={13} />
                  </a>
                  <button
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all flex items-center justify-center text-white/20 hover:text-red-400"
                    onClick={() => deleteWork(work.id)}
                  >
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
