import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  joined: string;
  country?: string;
  visaType?: string;
};

type AuthCtx = {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  loginWithGoogle: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const seed: User[] = [
  { id: "u2", name: "Aarav Sharma", email: "aarav@gmail.com", avatar: "https://i.pravatar.cc/120?img=15", role: "user", joined: "2025-11-02", country: "Australia", visaType: "Skilled 189" },
  { id: "u3", name: "Sofia Martinez", email: "sofia@gmail.com", avatar: "https://i.pravatar.cc/120?img=32", role: "user", joined: "2025-12-14", country: "UK", visaType: "Student" },
  { id: "u4", name: "Kenji Tanaka", email: "kenji@gmail.com", avatar: "https://i.pravatar.cc/120?img=53", role: "user", joined: "2026-01-20", country: "Australia", visaType: "Business" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    try { const s = localStorage.getItem("vm_users"); if (s) return JSON.parse(s); } catch {}
    return seed;
  });
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem("vm_user"); if (s) return JSON.parse(s); } catch {}
    return null;
  });

  useEffect(() => { localStorage.setItem("vm_users", JSON.stringify(users)); }, [users]);
  useEffect(() => { user ? localStorage.setItem("vm_user", JSON.stringify(user)) : localStorage.removeItem("vm_user"); }, [user]);

  const login: AuthCtx["login"] = (email) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u) return { ok: false, error: "Account not found. Try signing up." };
    setUser(u);
    return { ok: true };
  };
  const signup: AuthCtx["signup"] = (name, email) => {
    if (users.some((x) => x.email.toLowerCase() === email.toLowerCase())) return { ok: false, error: "Email already registered." };
    const nu: User = {
      id: "u" + (users.length + 1),
      name, email, avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`,
      role: "user", joined: new Date().toISOString().slice(0, 10),
    };
    setUsers([...users, nu]); setUser(nu);
    return { ok: true };
  };
  const loginWithGoogle: AuthCtx["loginWithGoogle"] = (email, name) => {
    let u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u) {
      u = { id: "u" + (users.length + 1), name, email, avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`, role: "user", joined: new Date().toISOString().slice(0, 10) };
      setUsers([...users, u]);
    }
    setUser(u);
  };
  const logout = () => setUser(null);
  const updateUser: AuthCtx["updateUser"] = (patch) => {
    if (!user) return;
    const nu = { ...user, ...patch };
    setUser(nu);
    setUsers(users.map((x) => (x.id === nu.id ? nu : x)));
  };

  return <Ctx.Provider value={{ user, users, login, signup, loginWithGoogle, logout, updateUser }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside provider");
  return c;
};
