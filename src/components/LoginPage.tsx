import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginPageProps {
  onLogin: (user: { name: string; group: string; avatar: string }) => void;
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        name: "Алексей Морозов",
        group: "ИТ-301",
        avatar: "АМ",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Фоновые орбы */}
      <div className="bg-orb w-96 h-96 bg-blue-600" style={{ top: "-10%", left: "-5%" }} />
      <div className="bg-orb w-80 h-80 bg-indigo-700" style={{ bottom: "5%", right: "-5%" }} />
      <div className="bg-orb w-64 h-64 bg-cyan-600" style={{ top: "60%", left: "20%" }} />

      {/* Сетка */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Логотип */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass glow-blue mb-4 animate-float">
            <Icon name="GraduationCap" size={32} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-montserrat font-bold gradient-text">СтудПортал</h1>
          <p className="text-muted-foreground text-sm mt-1">Личный кабинет студента</p>
        </div>

        {/* Карточка формы */}
        <div className="glass rounded-3xl p-8 glow-blue animate-fade-in stagger-2">
          <h2 className="text-xl font-montserrat font-semibold text-white mb-1">Добро пожаловать</h2>
          <p className="text-muted-foreground text-sm mb-7">Войдите в свой аккаунт</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-2 block">
                Email / Логин
              </label>
              <div className="relative">
                <Icon
                  name="Mail"
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.ru"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-2 block">
                Пароль
              </label>
              <div className="relative">
                <Icon
                  name="Lock"
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 group-hover:border-blue-400 transition-colors" />
                <span className="text-muted-foreground group-hover:text-white/80 transition-colors">Запомнить</span>
              </label>
              <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                Забыли пароль?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group"
              style={{
                background: loading
                  ? "rgba(59,130,246,0.4)"
                  : "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                color: "white",
                boxShadow: loading ? "none" : "0 0 30px rgba(59,130,246,0.3)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    Войти
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/8 text-center">
            <p className="text-muted-foreground text-sm">
              Нет аккаунта?{" "}
              <button onClick={onSwitchToRegister} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-muted-foreground/50 text-xs mt-6 animate-fade-in stagger-4">
          © 2026 СтудПортал. Все права защищены.
        </p>
      </div>
    </div>
  );
}