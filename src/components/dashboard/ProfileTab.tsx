import Icon from "@/components/ui/icon";

interface ProfileTabProps {
  user: { id?: number; name: string; group: string; email?: string; avatar: string };
  onLogout: () => void;
}

export default function ProfileTab({ user, onLogout }: ProfileTabProps) {
  const info = [
    { label: "Группа", value: user.group },
    { label: "Email", value: user.email ?? "—" },
  ];
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Профиль</h2>
        <p className="text-muted-foreground text-sm">Личные данные и статистика</p>
      </div>

      {/* Шапка профиля */}
      <div className="glass rounded-3xl p-6 mb-5 flex items-center gap-5 flex-wrap glow-blue">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-montserrat font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6, #0ea5e9)" }}
          >
            {user.avatar}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-background" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-montserrat font-bold text-white">{user.name}</h3>
          <p className="text-blue-300/80 text-sm mt-0.5">Группа {user.group}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/25 text-green-300">
              Активный студент
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-300">
              Бакалавриат
            </span>
          </div>
        </div>

        <button className="glass glass-hover px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/10 flex items-center gap-2">
          <Icon name="Pencil" size={14} />
          Редактировать
        </button>
      </div>

      {/* Информация */}
      <div className="glass rounded-2xl overflow-hidden mb-5">
        {info.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i !== info.length - 1 ? "border-b border-white/6" : ""
            }`}
          >
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm text-white font-medium text-right">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Выход */}
      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-red-500/20 bg-red-500/8 text-red-400 hover:bg-red-500/15 hover:border-red-500/35 hover:text-red-300"
      >
        <Icon name="LogOut" size={16} />
        Выйти из аккаунта
      </button>
    </div>
  );
}