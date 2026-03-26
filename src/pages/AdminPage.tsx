import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useSchedule, Lesson } from "@/hooks/useSchedule";

const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const TYPES: Lesson["type"][] = ["Лекция", "Практика", "Лаб"];

const typeColors: Record<string, string> = {
  "Лекция":   "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Практика": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Лаб":      "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const empty = (): Omit<Lesson, "id"> => ({
  group: "", weekday: "Понедельник", time_start: "", time_end: "",
  subject: "", teacher: "", room: "", type: "Лекция",
});

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const [filterGroup, setFilterGroup] = useState("");
  const { lessons, loading, error, createLesson, updateLesson, deleteLesson } = useSchedule(filterGroup || undefined);

  const [activeDay, setActiveDay] = useState("Понедельник");
  const [modal, setModal] = useState<{ open: boolean; editing: Lesson | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const openCreate = () => {
    setForm({ ...empty(), weekday: activeDay, group: filterGroup });
    setFormError("");
    setModal({ open: true, editing: null });
  };

  const openEdit = (lesson: Lesson) => {
    setForm({ group: lesson.group, weekday: lesson.weekday, time_start: lesson.time_start, time_end: lesson.time_end, subject: lesson.subject, teacher: lesson.teacher, room: lesson.room, type: lesson.type });
    setFormError("");
    setModal({ open: true, editing: lesson });
  };

  const closeModal = () => setModal({ open: false, editing: null });

  const setF = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.group || !form.subject || !form.time_start || !form.time_end || !form.teacher || !form.room) {
      setFormError("Заполните все поля"); return;
    }
    setSaving(true);
    try {
      if (modal.editing) {
        await updateLesson(modal.editing.id, form);
      } else {
        await createLesson(form);
      }
      closeModal();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const dayLessons = lessons
    .filter((l) => l.weekday === activeDay)
    .sort((a, b) => a.time_start.localeCompare(b.time_start));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="bg-orb w-96 h-96 bg-blue-600/30" style={{ top: "-10%", left: "-5%" }} />
      <div className="bg-orb w-80 h-80 bg-indigo-700/20" style={{ bottom: "5%", right: "-5%" }} />

      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-montserrat font-bold text-white">Панель администратора</h1>
              <p className="text-muted-foreground text-xs">Управление расписанием</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground glass hover:bg-white/10 border border-white/10 transition-all"
          >
            <Icon name="LogOut" size={15} />
            Выйти
          </button>
        </div>

        {/* Фильтр по группе */}
        <div className="glass rounded-2xl p-4 mb-6 flex items-center gap-3 flex-wrap">
          <Icon name="Users" size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            placeholder="Введите группу (например ИТ-301) для загрузки расписания"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none min-w-0"
          />
          {filterGroup && (
            <span className="text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-lg">
              {lessons.length} занятий
            </span>
          )}
        </div>

        {/* Дни */}
        <div className="flex gap-2 flex-wrap mb-5">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                day === activeDay
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "glass border-white/8 text-muted-foreground hover:border-white/20"
              }`}
            >
              {day}
            </button>
          ))}
          <button
            onClick={openCreate}
            className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
            style={{ background: "linear-gradient(135deg,#3b82f6,#0ea5e9)", color: "white" }}
          >
            <Icon name="Plus" size={15} />
            Добавить занятие
          </button>
        </div>

        {/* Список */}
        {!filterGroup ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Введите группу выше для просмотра расписания
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground gap-3">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span className="text-sm">Загружаем...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
            <Icon name="AlertCircle" size={15} />{error}
          </div>
        ) : dayLessons.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Занятий нет — добавьте первое</div>
        ) : (
          <div className="space-y-3">
            {dayLessons.map((lesson, i) => (
              <div
                key={lesson.id}
                className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
              >
                <div className="min-w-[90px] text-center">
                  <div className="text-white font-semibold text-sm">{lesson.time_start}</div>
                  <div className="text-muted-foreground text-xs">–{lesson.time_end}</div>
                </div>
                <div className="w-px self-stretch bg-white/10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-white font-semibold text-sm">{lesson.subject}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${typeColors[lesson.type] ?? ""}`}>
                      {lesson.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground flex-wrap">
                    <span>{lesson.teacher}</span>
                    <span>Ауд. {lesson.room}</span>
                    <span className="text-blue-400/60">Группа {lesson.group}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(lesson)}
                    className="w-8 h-8 rounded-lg glass hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center text-muted-foreground hover:text-white"
                  >
                    <Icon name="Pencil" size={13} />
                  </button>
                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all flex items-center justify-center text-white/20 hover:text-red-400"
                  >
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модалка */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 glass rounded-3xl p-7 w-full max-w-md glow-blue">
            <h3 className="text-lg font-montserrat font-bold text-white mb-5">
              {modal.editing ? "Редактировать занятие" : "Новое занятие"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Группа */}
              <Field label="Группа">
                <input value={form.group} onChange={setF("group")} placeholder="ИТ-301" className={inputCls} />
              </Field>

              {/* День */}
              <Field label="День недели">
                <select value={form.weekday} onChange={setF("weekday")} className={inputCls}>
                  {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>

              {/* Время */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Начало">
                  <input type="time" value={form.time_start} onChange={setF("time_start")} className={inputCls} />
                </Field>
                <Field label="Конец">
                  <input type="time" value={form.time_end} onChange={setF("time_end")} className={inputCls} />
                </Field>
              </div>

              {/* Предмет */}
              <Field label="Предмет">
                <input value={form.subject} onChange={setF("subject")} placeholder="Математический анализ" className={inputCls} />
              </Field>

              {/* Преподаватель */}
              <Field label="Преподаватель">
                <input value={form.teacher} onChange={setF("teacher")} placeholder="Проф. Иванов А.В." className={inputCls} />
              </Field>

              {/* Аудитория */}
              <Field label="Аудитория">
                <input value={form.room} onChange={setF("room")} placeholder="А-201" className={inputCls} />
              </Field>

              {/* Тип */}
              <Field label="Тип">
                <select value={form.type} onChange={setF("type")} className={inputCls}>
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>

              {formError && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <Icon name="AlertCircle" size={15} />{formError}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl text-sm font-semibold glass border border-white/10 text-muted-foreground hover:text-white transition-all">
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#0ea5e9)" }}
                >
                  {saving ? <><Icon name="Loader2" size={15} className="animate-spin" />Сохраняем...</> : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 transition-all";
