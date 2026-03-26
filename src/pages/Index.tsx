import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import Dashboard from "@/components/Dashboard";

interface User {
  name: string;
  group: string;
  avatar: string;
}

type Screen = "login" | "register";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>("login");

  if (user) {
    return <Dashboard user={user} onLogout={() => { setUser(null); setScreen("login"); }} />;
  }

  if (screen === "register") {
    return (
      <RegisterPage
        onRegister={(userData) => setUser(userData)}
        onSwitchToLogin={() => setScreen("login")}
      />
    );
  }

  return (
    <LoginPage
      onLogin={(userData) => setUser(userData)}
      onSwitchToRegister={() => setScreen("register")}
    />
  );
}
