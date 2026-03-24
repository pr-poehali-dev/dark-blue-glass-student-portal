import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Dashboard from "@/components/Dashboard";

interface User {
  name: string;
  group: string;
  avatar: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
