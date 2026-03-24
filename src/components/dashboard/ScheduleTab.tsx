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
  "Лекция": "bg-blue-50 text-blue-700 border-blue-200",
  "Практика": "bg-violet-50 text-violet-700 border-violet-200",
  "Лаб": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const today = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][new Date().getDay()];

export default function ScheduleTab() {
  const activeDay = days.includes(today) ? today : "Понедельник";

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-0.5">Расписание</h2>
        <p className="text-gray-400 text-sm">Весенний семестр 2026 · текущая неделя</p>
      </div>

      {/* Дни */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {days.map((day) => (
          <div
            key={day}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border cursor-default transition-all ${
              day === activeDay
                ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Занятия */}
      <div className="space-y-2">
        {(schedule[activeDay] || []).map((lesson, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 card-clean-hover animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            {/* Время */}
            <div className="min-w-[72px]">
              <div className="text-gray-900 font-semibold text-sm">{lesson.time.split("–")[0]}</div>
              <div className="text-gray-400 text-xs mt-0.5">{lesson.time.split("–")[1]}</div>
            </div>

            {/* Вертикальная линия */}
            <div className="w-px self-stretch bg-gray-100 rounded-full flex-shrink-0" />

            {/* Инфо */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="text-gray-900 font-semibold text-sm">{lesson.subject}</h3>
                <span className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold ${typeColors[lesson.type]}`}>
                  {lesson.type}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
                <span>{lesson.teacher}</span>
                <span className="text-gray-300">·</span>
                <span>Ауд. {lesson.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
