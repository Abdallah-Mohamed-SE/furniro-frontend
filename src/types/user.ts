// ============================================================
// src/types/user.ts
// ============================================================

export type UserRole = "customer" | "admin" | "CUSTOMER" | "ADMIN" | string;

export interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  addresses?: any[];
  emailVerifiedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
