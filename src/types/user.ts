// ============================================================
// src/types/user.ts
// ============================================================

export type UserRole = "customer" | "admin" | "vendor";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  emailVerifiedAt?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
