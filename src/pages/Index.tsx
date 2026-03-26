import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import Dashboard from "@/components/Dashboard";
import AdminPage from "@/pages/AdminPage";
import Icon from "@/components/ui/icon";

type Screen = "login" | "register";

export default function Index() {
  const { user, loading, login, register, logout } = useAuth();
  const [screen, setScreen] = useState<Screen>("login");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Icon name="Loader2" size={22} className="animate-spin text-blue-400" />
          <span className="text-sm">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <AdminPage onLogout={logout} />;
    }
    return <Dashboard user={user} onLogout={logout} />;
  }

  if (screen === "register") {
    return (
      <RegisterPage
        onRegister={async (name, group, email, password) => {
          await register(name, group, email, password);
        }}
        onSwitchToLogin={() => setScreen("login")}
      />
    );
  }

  return (
    <LoginPage
      onLogin={async (email, password) => {
        await login(email, password);
      }}
      onSwitchToRegister={() => setScreen("register")}
    />
  );
}
