"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { User } from "@/types/user";
import type { AuthContextValue, LoginInput, RegisterInput } from "@/types/auth";
import { api, setAuthToken, getAuthToken, ApiError } from "@/lib/api";

const USER_STORAGE_KEY = "furniro_user";
const LEGACY_USER_KEY = "auth_user";

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
  const raw =
    localStorage.getItem(USER_STORAGE_KEY) ||
    localStorage.getItem(LEGACY_USER_KEY);
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

function saveUserToStorage(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    const raw = JSON.stringify(user);
    cachedUserRaw = raw;
    cachedUser = user;
    localStorage.setItem(USER_STORAGE_KEY, raw);
    localStorage.setItem(LEGACY_USER_KEY, raw);
  } else {
    cachedUserRaw = null;
    cachedUser = null;
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
  }
  notifySubscribers();
}

interface AuthApiResponse {
  user: User;
  access_token: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, getServerSnapshot);

  // Restore & verify current profile from backend upon app load
  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    let isMounted = true;
    api
      .get<User>("/auth/profile")
      .then((profile) => {
        if (isMounted && profile) {
          saveUserToStorage(profile);
        }
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          // Token expired or invalid
          setAuthToken(null);
          saveUserToStorage(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (data: LoginInput) => {
    try {
      const res = await api.post<AuthApiResponse>("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res && res.access_token) {
        setAuthToken(res.access_token);
        saveUserToStorage(res.user);
        return { success: true };
      }
      return { success: false, error: "استجابة غير صحيحة من الخادم" };
    } catch (err: any) {
      return {
        success: false,
        error:
          err?.message ||
          "حدث خطأ أثناء تسجيل الدخول، يرجى التحقق من البيانات والمحاولة مجدداً.",
      };
    }
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    try {
      const res = await api.post<AuthApiResponse>("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
      });

      if (res && res.access_token) {
        setAuthToken(res.access_token);
        saveUserToStorage(res.user);
        return { success: true };
      }
      return { success: false, error: "استجابة غير صحيحة من الخادم" };
    } catch (err: any) {
      return {
        success: false,
        error:
          err?.message ||
          "تعذر إنشاء الحساب حالياً، يرجى التحقق من البيانات والمحاولة لاحقاً.",
      };
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    saveUserToStorage(null);
  }, []);

  const updateUser = useCallback((updatedFields: Partial<User>) => {
    const current = getUserSnapshot();
    if (!current) return;
    const updated = { ...current, ...updatedFields };
    saveUserToStorage(updated);
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
