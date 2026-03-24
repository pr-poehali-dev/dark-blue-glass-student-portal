import { useState } from "react";
import Icon from "@/components/ui/icon";
import ScheduleTab from "./dashboard/ScheduleTab";
import NotificationsTab from "./dashboard/NotificationsTab";
import AssignmentsTab from "./dashboard/AssignmentsTab";
import WorksTab from "./dashboard/WorksTab";
import ProfileTab from "./dashboard/ProfileTab";

interface DashboardProps {
  user: { name: string; group: string; avatar: string };
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
      case "schedule": return <ScheduleTab />;
      case "notifications": return <NotificationsTab />;
      case "assignments": return <AssignmentsTab />;
      case "works": return <WorksTab />;
      case "profile": return <ProfileTab user={user} onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">

      {/* Сайдбар */}
      <aside className="w-60 flex-shrink-0 hidden md:flex flex-col bg-white border-r border-gray-100 py-6 px-4">
        {/* Лого */}
        <div className="flex items-center gap-2.5 px-2 mb-8 animate-fade-in">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a3a6b, #1e4da1)" }}
          >
            <Icon name="GraduationCap" size={16} className="text-white" />
          </div>
          <div>
            <div className="text-gray-900 font-bold text-sm leading-none">СтудПортал</div>
            <div className="text-gray-400 text-[11px] mt-0.5">Личный кабинет</div>
          </div>
        </div>

        {/* Карточка студента */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-6 flex items-center gap-3 animate-fade-in stagger-1">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1a3a6b, #1e4da1)" }}
          >
            {user.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-gray-900 text-sm font-semibold truncate">{user.name.split(" ")[0]} {user.name.split(" ")[1]?.[0]}.</div>
            <div className="text-gray-400 text-[11px]">Гр. {user.group}</div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all animate-fade-in ${
                activeTab === item.id
                  ? "nav-active-light"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <Icon name={item.icon} fallback="Circle" size={17} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  activeTab === item.id ? "bg-white/25 text-white" : "bg-blue-100 text-blue-600"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Плашка внизу */}
        <div className="pt-4 border-t border-gray-100 mt-4 animate-fade-in stagger-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon name="CalendarClock" size={13} className="text-blue-600" />
              <span className="text-blue-800 font-semibold">Весенний семестр</span>
            </div>
            <div className="text-blue-600/70">До сессии: <span className="text-orange-500 font-semibold">38 дней</span></div>
          </div>
        </div>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Шапка */}
        <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-gray-900 font-bold text-lg leading-none">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5 capitalize">
              {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all relative">
              <Icon name="Bell" size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
            </button>
            {/* Мобильный аватар */}
            <button
              className="md:hidden flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-600 hover:border-gray-300 transition-all"
              onClick={onLogout}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #1a3a6b, #1e4da1)" }}
              >
                {user.avatar}
              </div>
            </button>
          </div>
        </header>

        {/* Контент */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {renderTab()}
          </div>
        </div>

        {/* Мобильная навигация */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 px-2 py-2 pb-safe">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
                  activeTab === item.id ? "text-blue-700" : "text-gray-400"
                }`}
              >
                <Icon name={item.icon} fallback="Circle" size={20} />
                <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
                {item.badge && (
                  <span className="absolute top-0.5 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
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
