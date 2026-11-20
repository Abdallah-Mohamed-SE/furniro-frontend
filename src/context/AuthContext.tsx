"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { User } from "@/types/user";
import type { AuthContextValue, LoginInput, RegisterInput } from "@/types/auth";

const USER_STORAGE_KEY = "auth_user";
const TOKEN_STORAGE_KEY = "auth_token";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedUserRaw: string | null = null;
let cachedUser: User | null = null;

function getUserSnapshot(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (raw !== cachedUserRaw) {
    cachedUserRaw = raw;
    try {
      cachedUser = raw ? JSON.parse(raw) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

function getServerSnapshot(): User | null {
  return null;
}

function notifySubscribers() {
  listeners.forEach((listener) => listener());
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, getServerSnapshot);

  const login = useCallback(async (data: LoginInput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: Date.now(),
        name: data.email.split("@")[0].replace(/[._]/g, " ") || "عميل Furniro",
        email: data.email,
        phone: "+966 50 123 4567",
        role: "customer",
        createdAt: new Date().toISOString(),
      };

      const mockToken = `mock_token_${Date.now()}`;
      cachedUserRaw = JSON.stringify(mockUser);
      cachedUser = mockUser;
      localStorage.setItem(USER_STORAGE_KEY, cachedUserRaw);
      localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);
      notifySubscribers();
      return { success: true };
    } catch {
      return {
        success: false,
        error: "حدث خطأ أثناء تسجيل الدخول، يرجى التحقق من البيانات والمحاولة مجدداً.",
      };
    }
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: "customer",
        createdAt: new Date().toISOString(),
      };

      const mockToken = `mock_token_${Date.now()}`;
      cachedUserRaw = JSON.stringify(newUser);
      cachedUser = newUser;
      localStorage.setItem(USER_STORAGE_KEY, cachedUserRaw);
      localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);
      notifySubscribers();
      return { success: true };
    } catch {
      return {
        success: false,
        error: "تعذر إنشاء الحساب حالياً، يرجى المحاولة في وقت لاحق.",
      };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      cachedUserRaw = null;
      cachedUser = null;
      notifySubscribers();
    } catch (error) {
      console.error("فشل حذف الجلسة:", error);
    }
  }, []);

  const updateUser = useCallback((updatedFields: Partial<User>) => {
    const current = getUserSnapshot();
    if (!current) return;
    const updated = { ...current, ...updatedFields };
    cachedUserRaw = JSON.stringify(updated);
    cachedUser = updated;
    localStorage.setItem(USER_STORAGE_KEY, cachedUserRaw);
    notifySubscribers();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
