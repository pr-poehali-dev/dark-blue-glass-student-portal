import Icon from "@/components/ui/icon";

const notifications = [
  {
    id: 1,
    icon: "Clock",
    title: "Дедлайн через 2 дня",
    text: "Курсовая работа по базам данных — сдача 26 марта",
    time: "Сегодня, 10:30",
    unread: true,
    dot: "bg-orange-400",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50 border-orange-100",
  },
  {
    id: 2,
    icon: "Star",
    title: "Новая оценка",
    text: "Математический анализ — Контрольная №3: Отлично (5)",
    time: "Вчера, 16:45",
    unread: true,
    dot: "bg-yellow-400",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50 border-yellow-100",
  },
  {
    id: 3,
    icon: "Info",
    title: "Изменение расписания",
    text: "Лекция по физике в пятницу перенесена с 08:00 на 10:00, ауд. Б-203",
    time: "22 марта, 09:15",
    unread: true,
    dot: "bg-blue-400",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    id: 4,
    icon: "CheckCircle",
    title: "Работа принята",
    text: "Лабораторная работа №5 по программированию принята преподавателем",
    time: "20 марта, 14:20",
    unread: false,
    dot: "bg-green-400",
    iconColor: "text-green-600",
    iconBg: "bg-green-50 border-green-100",
  },
  {
    id: 5,
    icon: "Calendar",
    title: "Зачётная неделя",
    text: "Зачётная неделя начинается 1 апреля. Проверьте расписание зачётов.",
    time: "18 марта, 11:00",
    unread: false,
    dot: "bg-violet-400",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
  },
  {
    id: 6,
    icon: "Bell",
    title: "Напоминание",
    text: "Не забудьте оплатить общежитие до конца месяца",
    time: "15 марта, 08:00",
    unread: false,
    dot: "bg-gray-400",
    iconColor: "text-gray-500",
    iconBg: "bg-gray-50 border-gray-100",
  },
];

export default function NotificationsTab() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-0.5">Уведомления</h2>
          <p className="text-gray-400 text-sm">{unreadCount} непрочитанных</p>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-all">
          Прочитать все
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div
            key={n.id}
            className={`bg-white border rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer card-clean-hover animate-fade-in ${
              n.unread ? "border-gray-100" : "border-gray-50 opacity-60"
            }`}
            style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${n.iconBg}`}>
              <Icon name={n.icon} fallback="Bell" size={16} className={n.iconColor} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  {n.title}
                  {n.unread && <span className={`w-1.5 h-1.5 rounded-full ${n.dot} flex-shrink-0`} />}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
