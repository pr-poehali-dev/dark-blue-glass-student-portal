import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginPageProps {
  onLogin: (user: { name: string; group: string; avatar: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: "Алексей Морозов", group: "ИТ-301", avatar: "АМ" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      {/* Левая панель */}
      <div
        className="hidden lg:flex lg:w-[44%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a3a6b 0%, #1e4da1 50%, #1565c0 100%)" }}
      >
        {/* Тонкая сетка */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />

        {/* Декоративные круги */}
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)" }} />
        <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 rounded-full opacity-8" style={{ background: "radial-gradient(circle, white, transparent)" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <Icon name="GraduationCap" size={22} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">СтудПортал</span>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-200/60 text-xs font-medium uppercase tracking-widest mb-4">Академическая система</p>
          <h2 className="text-white text-4xl font-bold leading-tight mb-6">
            Все учебные<br />материалы<br />в одном месте
          </h2>
          <div className="space-y-3">
            {["Расписание занятий", "Задания и дедлайны", "Хранение работ и проектов", "Уведомления от преподавателей"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-blue-100/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={11} className="text-white" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-blue-200/40 text-xs">
          © 2026 СтудПортал
        </div>
      </div>

      {/* Правая панель — форма */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-in">

          {/* Мобильный лого */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Icon name="GraduationCap" size={24} className="text-blue-700" />
            <span className="font-bold text-gray-900 text-lg">СтудПортал</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Вход в систему</h1>
          <p className="text-gray-500 text-sm mb-8">Введите данные вашего аккаунта</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Email / Логин
              </label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.ru"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Пароль
                </label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Забыли пароль?
                </button>
              </div>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-4 h-4 rounded border-2 border-gray-300 group-hover:border-blue-500 transition-colors flex-shrink-0" />
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Запомнить меня</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? "#93aed8" : "linear-gradient(135deg, #1a3a6b, #1e4da1)",
                boxShadow: loading ? "none" : "0 4px 14px rgba(30,77,161,0.3)"
              }}
            >
              {loading ? (
                <><Icon name="Loader2" size={16} className="animate-spin" />Вход...</>
              ) : (
                <><span>Войти</span><Icon name="ArrowRight" size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Нет аккаунта?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
