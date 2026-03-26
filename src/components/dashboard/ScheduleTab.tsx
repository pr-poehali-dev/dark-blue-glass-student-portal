const schedule: Record<string, { time: string; subject: string; teacher: string; room: string; type: string }[]> = {
  "Понедельник": [
    { time: "08:00–09:35", subject: "Математический анализ", teacher: "Проф. Иванов А.В.", room: "А-201", type: "Лекция" },
    { time: "09:45–11:20", subject: "Физика", teacher: "Доц. Петрова М.С.", room: "Б-105", type: "Практика" },
    { time: "13:00–14:35", subject: "Программирование на Python", teacher: "Ст. пр. Соколов Д.И.", room: "Л-301", type: "Лаб" },
  ],
  "Вторник": [
    { time: "09:45–11:20", subject: "Базы данных", teacher: "Доц. Козлов В.А.", room: "Л-204", type: "Лаб" },
    { time: "11:30–13:05", subject: "Линейная алгебра", teacher: "Проф. Смирнова Е.П.", room: "А-102", type: "Лекция" },
  ],
  "Среда": [
    { time: "08:00–09:35", subject: "Алгоритмы и структуры данных", teacher: "Доц. Новиков К.Р.", room: "Л-301", type: "Лекция" },
    { time: "09:45–11:20", subject: "Веб-разработка", teacher: "Ст. пр. Федоров А.М.", room: "Л-205", type: "Лаб" },
    { time: "14:45–16:20", subject: "Иностранный язык", teacher: "Пр. Белова Т.Н.", room: "К-110", type: "Практика" },
  ],
  "Четверг": [
    { time: "11:30–13:05", subject: "Операционные системы", teacher: "Доц. Морозов С.В.", room: "Л-302", type: "Лекция" },
    { time: "13:00–14:35", subject: "Математический анализ", teacher: "Проф. Иванов А.В.", room: "А-203", type: "Практика" },
  ],
  "Пятница": [
    { time: "08:00–09:35", subject: "Физика", teacher: "Доц. Петрова М.С.", room: "Б-101", type: "Лекция" },
    { time: "09:45–11:20", subject: "Программирование на Python", teacher: "Ст. пр. Соколов Д.И.", room: "Л-301", type: "Лаб" },
  ],
};

const typeColors: Record<string, string> = {
  "Лекция": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Практика": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Лаб": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const today = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][new Date().getDay()];

export default function ScheduleTab() {
  const activeDay = days.includes(today) ? today : "Понедельник";

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Расписание</h2>
        <p className="text-muted-foreground text-sm">Текущая неделя · Весенний семестр 2026</p>
      </div>

      {/* Дни недели */}
      <div className="flex gap-2 flex-wrap mb-6">
        {days.map((day) => (
          <div
            key={day}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-default ${
              day === activeDay
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "glass border-white/8 text-muted-foreground"
            }`}
          >
            {day}
            {day === activeDay && (
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-400 inline-block align-middle" />
            )}
          </div>
        ))}
      </div>

      {/* Занятия */}
      <div className="space-y-3">
        {(schedule[activeDay] || []).map((lesson, i) => (
          <div
            key={i}
            className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            {/* Время */}
            <div className="min-w-[90px] text-center">
              <div className="text-white font-semibold text-sm">{lesson.time.split("–")[0]}</div>
              <div className="text-muted-foreground text-xs">–{lesson.time.split("–")[1]}</div>
            </div>

            {/* Разделитель */}
            <div className="w-px self-stretch bg-white/10 rounded-full" />

            {/* Инфо */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="text-white font-semibold text-sm leading-snug">{lesson.subject}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${typeColors[lesson.type]}`}>
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
    </div>
  );
}
