import Icon from "@/components/ui/icon";

const notifications = [
  {
    id: 1,
    type: "deadline",
    icon: "Clock",
    title: "Дедлайн через 2 дня",
    text: "Курсовая работа по базам данных — сдача 26 марта",
    time: "Сегодня, 10:30",
    unread: true,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: 2,
    type: "grade",
    icon: "Star",
    title: "Новая оценка",
    text: "Математический анализ — Контрольная №3: Отлично (5)",
    time: "Вчера, 16:45",
    unread: true,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: 3,
    type: "info",
    icon: "Info",
    title: "Изменение расписания",
    text: "Лекция по физике в пятницу перенесена с 08:00 на 10:00, ауд. Б-203",
    time: "22 марта, 09:15",
    unread: true,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 4,
    type: "success",
    icon: "CheckCircle",
    title: "Работа принята",
    text: "Лабораторная работа №5 по программированию принята преподавателем",
    time: "20 марта, 14:20",
    unread: false,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    id: 5,
    type: "deadline",
    icon: "Calendar",
    title: "Зачётная неделя",
    text: "Зачётная неделя начинается 1 апреля. Проверьте расписание зачётов.",
    time: "18 марта, 11:00",
    unread: false,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    id: 6,
    type: "info",
    icon: "Bell",
    title: "Напоминание",
    text: "Не забудьте оплатить общежитие до конца месяца",
    time: "15 марта, 08:00",
    unread: false,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

export default function NotificationsTab() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Уведомления</h2>
          <p className="text-muted-foreground text-sm">{unreadCount} непрочитанных</p>
        </div>
        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors px-3 py-1.5 glass rounded-lg border border-white/10 hover:border-blue-500/30">
          Отметить все прочитанными
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div
            key={n.id}
            className={`glass glass-hover rounded-2xl p-5 flex items-start gap-4 border animate-fade-in cursor-pointer ${
              n.unread ? "border-white/12" : "border-white/6 opacity-70"
            }`}
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${n.bg}`}>
              <Icon name={n.icon} fallback="Bell" size={18} className={n.color} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  {n.title}
                  {n.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  )}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}