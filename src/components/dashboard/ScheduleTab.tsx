import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useSubjects, daysUntil, deadlineColor, type SubjectCreate } from "@/hooks/useSchedule";

const PALETTE = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

const EMPTY: SubjectCreate = {
  name: "",
  teacher: "",
  deadline: "",
  session_days: 30,
  color: PALETTE[0],
  note: "",
};

export default function ScheduleTab() {
  const { subjects, loading, error, create, update, remove } = useSubjects();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<SubjectCreate>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormError("");
    setModal(true);
  };

  const openEdit = (id: number) => {
    const s = subjects.find((x) => x.id === id);
    if (!s) return;
    setEditing(id);
    setForm({
      name: s.name,
      teacher: s.teacher,
      deadline: s.deadline,
      session_days: s.session_days,
      color: s.color ?? PALETTE[0],
      note: s.note ?? "",
    });
    setFormError("");
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setFormError("Введите название предмета"); return; }
    if (!form.teacher.trim()) { setFormError("Введите преподавателя"); return; }
    if (!form.deadline) { setFormError("Укажите дату сдачи"); return; }
    if (!form.session_days || form.session_days < 0) { setFormError("Укажите дней до сессии"); return; }
    setSaving(true);
    setFormError("");
    try {
      if (editing !== null) {
        await update(editing, form);
      } else {
        await create(form);
      }
      closeModal();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
    try {
      await remove(id);
    } finally {
      setDeleteId(null);
    }
  };

  // Сортируем по дедлайну
  const sorted = [...subjects].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <div className="animate-fade-in">
      {/* Заголовок */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Мои предметы</h2>
          <p className="text-muted-foreground text-sm">
            {subjects.length > 0
              ? `${subjects.length} предмет${subjects.length === 1 ? "" : subjects.length < 5 ? "а" : "ов"}`
              : "Добавь предметы и следи за дедлайнами"}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {/* Состояния */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Icon name="Loader2" size={20} className="animate-spin" />
          <span className="text-sm">Загрузка...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
          <Icon name="AlertCircle" size={15} />
          {error}
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
            <Icon name="BookOpen" size={28} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-base mb-1">Предметов пока нет</p>
            <p className="text-muted-foreground text-sm">Нажми «Добавить» и внеси первый предмет</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((s, i) => {
            const days = daysUntil(s.deadline);
            const color = deadlineColor(days);
            const accent = s.color ?? PALETTE[0];
            const deadlineLabel =
              days < 0 ? `Просрочено на ${Math.abs(days)} дн.` :
              days === 0 ? "Сдать сегодня!" :
              days === 1 ? "Завтра!" :
              `Через ${days} дн.`;

            return (
              <div
                key={s.id}
                className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0, borderLeft: `3px solid ${accent}` }}
              >
                {/* Цвет метки */}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: accent }}
                />

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-white font-semibold text-base leading-snug">{s.name}</h3>
                    <span className={`text-xs font-semibold ${color}`}>{deadlineLabel}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Icon name="User" size={12} />
                      {s.teacher}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="CalendarClock" size={12} />
                      Сдача: {new Date(s.deadline).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Timer" size={12} />
                      До сессии: <span className="text-orange-300 font-semibold ml-0.5">{s.session_days} дн.</span>
                    </span>
                  </div>

                  {s.note && (
                    <p className="text-muted-foreground text-xs mt-2 leading-relaxed italic">{s.note}</p>
                  )}
                </div>

                {/* Кнопки */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEdit(s.id)}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-blue-400 transition-colors"
                  >
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deleteId === s.id}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    {deleteId === s.id
                      ? <Icon name="Loader2" size={14} className="animate-spin" />
                      : <Icon name="Trash2" size={14} />
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Модалка */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 glass rounded-2xl p-6 w-full max-w-md border border-white/10 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-montserrat font-bold text-lg">
                {editing !== null ? "Редактировать предмет" : "Новый предмет"}
              </h3>
              <button onClick={closeModal} className="text-muted-foreground hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Название */}
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Название предмета *</label>
                <input
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500/50 outline-none transition-colors"
                  placeholder="Математический анализ"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>

              {/* Препод */}
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Преподаватель *</label>
                <input
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500/50 outline-none transition-colors"
                  placeholder="Иванов И.И."
                  value={form.teacher}
                  onChange={(e) => setForm((p) => ({ ...p, teacher: e.target.value }))}
                />
              </div>

              {/* Дата сдачи + Дни до сессии */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Дата сдачи *</label>
                  <input
                    type="date"
                    className="w-full glass rounded-xl px-3 py-3 text-sm text-white border border-white/10 focus:border-blue-500/50 outline-none transition-colors [color-scheme:dark]"
                    value={form.deadline}
                    onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Дней до сессии *</label>
                  <input
                    type="number"
                    min={0}
                    max={365}
                    className="w-full glass rounded-xl px-3 py-3 text-sm text-white border border-white/10 focus:border-blue-500/50 outline-none transition-colors"
                    placeholder="30"
                    value={form.session_days || ""}
                    onChange={(e) => setForm((p) => ({ ...p, session_days: Number(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Заметка */}
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Заметка</label>
                <textarea
                  rows={2}
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500/50 outline-none transition-colors resize-none"
                  placeholder="Курсовая, зачёт, экзамен..."
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                />
              </div>

              {/* Цвет */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Цвет метки</label>
                <div className="flex gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm((p) => ({ ...p, color: c }))}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        background: c,
                        borderColor: form.color === c ? "white" : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>

              {formError && (
                <div className="text-red-400 text-xs flex items-center gap-1.5">
                  <Icon name="AlertCircle" size={13} />
                  {formError}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 glass border border-white/10 text-muted-foreground hover:text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {saving && <Icon name="Loader2" size={15} className="animate-spin" />}
                {editing !== null ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
