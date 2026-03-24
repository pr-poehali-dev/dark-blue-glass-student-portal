import Icon from "@/components/ui/icon";

interface ProfileTabProps {
  user: { name: string; group: string; avatar: string };
  onLogout: () => void;
}

const stats = [
  { label: "Средний балл", value: "4.7", icon: "Star", color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-100" },
  { label: "Работ сдано", value: "32", icon: "FileCheck", color: "text-green-600", bg: "bg-green-50 border-green-100" },
  { label: "Пропусков", value: "3", icon: "AlertCircle", color: "text-orange-500", bg: "bg-orange-50 border-orange-100" },
  { label: "Семестр", value: "6-й", icon: "BookOpen", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
];

const info = [
  { label: "Университет", value: "МГТУ им. Баумана" },
  { label: "Факультет", value: "Информатика и системы управления" },
  { label: "Кафедра", value: "ИУ-3 · Информационные технологии" },
  { label: "Группа", value: "ИТ-301" },
  { label: "Форма обучения", value: "Очная" },
  { label: "Email", value: "morozov@student.bmstu.ru" },
  { label: "Студенческий билет", value: "№ 2021-04-3015" },
];

export default function ProfileTab({ user, onLogout }: ProfileTabProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-0.5">Профиль</h2>
        <p className="text-gray-400 text-sm">Личные данные и статистика</p>
      </div>

      {/* Шапка */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex items-center gap-4 flex-wrap card-clean">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1a3a6b, #1e4da1)" }}
          >
            {user.avatar}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
          <p className="text-blue-600 text-sm font-medium mt-0.5">Группа {user.group}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-green-50 border border-green-200 text-green-700">
              Активный студент
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700">
              Бакалавриат
            </span>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all">
          <Icon name="Pencil" size={13} />
          Редактировать
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white border border-gray-100 rounded-2xl p-4 text-center card-clean animate-fade-in"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mx-auto mb-2.5 ${s.bg}`}>
              <Icon name={s.icon} fallback="Info" size={17} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Информация */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
        {info.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i !== info.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <span className="text-sm text-gray-400">{item.label}</span>
            <span className="text-sm text-gray-800 font-medium text-right">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Выход */}
      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200"
      >
        <Icon name="LogOut" size={15} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
