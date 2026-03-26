import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useSchedule } from "@/hooks/useSchedule";

interface ScheduleTabProps {
  group: string;
}

const typeColors: Record<string, string> = {
  "Лекция":   "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Практика": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Лаб":      "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const todayName = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][new Date().getDay()];

export default function ScheduleTab({ group }: ScheduleTabProps) {
  const { lessons, loading, error } = useSchedule(group);
  const [activeDay, setActiveDay] = useState(DAYS.includes(todayName) ? todayName : "Понедельник");

  const dayLessons = lessons
    .filter((l) => l.weekday === activeDay)
    .sort((a, b) => a.time_start.localeCompare(b.time_start));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Расписание</h2>
        <p className="text-muted-foreground text-sm">Группа {group} · Весенний семестр 2026</p>
      </div>

      {/* Дни недели */}
      <div className="flex gap-2 flex-wrap mb-6">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              day === activeDay
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "glass border-white/8 text-muted-foreground hover:border-white/20 hover:text-white/70"
            }`}
          >
            {day}
            {day === todayName && (
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-400 inline-block align-middle" />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-3">
          <Icon name="Loader2" size={20} className="animate-spin" />
          <span className="text-sm">Загружаем расписание...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
          <Icon name="AlertCircle" size={15} />{error}
        </div>
      ) : dayLessons.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Занятий нет</div>
      ) : (
        <div className="space-y-3">
          {dayLessons.map((lesson, i) => (
            <div
              key={lesson.id}
              className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div className="min-w-[90px] text-center">
                <div className="text-white font-semibold text-sm">{lesson.time_start}</div>
                <div className="text-muted-foreground text-xs">–{lesson.time_end}</div>
              </div>

              <div className="w-px self-stretch bg-white/10 rounded-full" />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="text-white font-semibold text-sm leading-snug">{lesson.subject}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${typeColors[lesson.type] ?? "bg-white/5 text-white/50 border-white/10"}`}>
                    {lesson.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400/60" />
                    {lesson.teacher}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
                    Ауд. {lesson.room}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
