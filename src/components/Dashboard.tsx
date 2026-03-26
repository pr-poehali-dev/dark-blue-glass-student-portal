import { useState } from "react";
import Icon from "@/components/ui/icon";
import ScheduleTab from "./dashboard/ScheduleTab";
import NotificationsTab from "./dashboard/NotificationsTab";
import AssignmentsTab from "./dashboard/AssignmentsTab";
import WorksTab from "./dashboard/WorksTab";
import ProfileTab from "./dashboard/ProfileTab";

interface DashboardProps {
  user: { name: string; group: string; avatar: string; role?: string };
  onLogout: () => void;
}

type Tab = "schedule" | "notifications" | "assignments" | "works" | "profile";

const navItems: { id: Tab; label: string; icon: string; badge?: number }[] = [
  { id: "schedule", label: "Расписание", icon: "CalendarDays" },
  { id: "notifications", label: "Уведомления", icon: "Bell", badge: 3 },
  { id: "assignments", label: "Задания", icon: "ClipboardList", badge: 2 },
  { id: "works", label: "Мои работы", icon: "FolderOpen" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  const renderTab = () => {
    switch (activeTab) {
      case "schedule": return <ScheduleTab group={user.group} />;
      case "notifications": return <NotificationsTab />;
      case "assignments": return <AssignmentsTab />;
      case "works": return <WorksTab />;
      case "profile": return <ProfileTab user={user} onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Орбы */}
      <div className="bg-orb w-96 h-96 bg-blue-700" style={{ top: "10%", left: "15%" }} />
      <div className="bg-orb w-72 h-72 bg-indigo-700" style={{ bottom: "10%", right: "5%" }} />

      {/* Сетка */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Сайдбар */}
      <aside className="relative z-10 w-64 flex-shrink-0 hidden md:flex flex-col py-6 px-4 border-r border-white/8">
        {/* Лого */}
        <div className="flex items-center gap-3 px-2 mb-8 animate-fade-in">
          <div className="w-9 h-9 rounded-xl glass flex items-center justify-center glow-blue">
            <Icon name="GraduationCap" size={20} className="text-blue-400" />
          </div>
          <div>
            <div className="text-white font-montserrat font-bold text-sm leading-none">СтудПортал</div>
            <div className="text-muted-foreground text-xs mt-0.5">Личный кабинет</div>
          </div>
        </div>

        {/* Аватар в сайдбаре */}
        <div className="glass rounded-2xl p-4 mb-6 flex items-center gap-3 animate-fade-in stagger-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6, #0ea5e9)" }}
          >
            {user.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{user.name.split(" ")[0]} {user.name.split(" ")[1]?.[0]}.</div>
            <div className="text-muted-foreground text-xs">Гр. {user.group}</div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border transition-all animate-fade-in ${
                activeTab === item.id
                  ? "nav-active border-blue-500/25"
                  : "text-muted-foreground border-transparent hover:text-white hover:bg-white/5"
              }`}
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <Icon name={item.icon} fallback="Circle" size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Нижняя часть */}
        <div className="pt-4 border-t border-white/8 mt-4 animate-fade-in stagger-6">
          <div className="glass rounded-xl p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={12} className="text-blue-400" />
              <span className="text-white/70 font-medium">Весенний семестр</span>
            </div>
            <div className="text-xs">До сессии: <span className="text-orange-300 font-semibold">38 дней</span></div>
          </div>
        </div>
      </aside>

      {/* Контент */}
      <main className="flex-1 relative z-10 flex flex-col min-h-screen overflow-hidden">
        {/* Шапка */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 glass-hover">
          <div>
            <h1 className="text-white font-montserrat font-semibold text-lg">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-muted-foreground text-xs">
              {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-colors relative">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
            </button>
            <button
              className="flex items-center gap-2 glass glass-hover rounded-xl px-3 py-2 border border-white/10 md:hidden"
              onClick={onLogout}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #3b82f6, #0ea5e9)" }}
              >
                {user.avatar}
              </div>
            </button>
          </div>
        </header>

        {/* Основной контент */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {renderTab()}
          </div>
        </div>

        {/* Нижняя навигация (мобильная) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 glass border-t border-white/10 px-2 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all relative ${
                  activeTab === item.id ? "text-blue-400" : "text-muted-foreground"
                }`}
              >
                <Icon name={item.icon} fallback="Circle" size={20} />
                <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
                {item.badge && (
                  <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}