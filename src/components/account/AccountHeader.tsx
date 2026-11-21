import { User as UserIcon, Calendar, Mail, Phone, LogOut } from "lucide-react";
import type { User } from "@/types/user";

export interface AccountHeaderProps {
  user: User;
  onLogout: () => void;
}

export function AccountHeader({ user, onLogout }: AccountHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
      })
    : "فترة قريبة";

  return (
    <div className="rounded-xl border border-border bg-[#fcf8f3] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        {/* User Avatar & Info */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-md">
            {initials || <UserIcon className="h-10 w-10" />}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl font-extrabold text-heading">
                {user.name}
              </h1>
              <span className="rounded-full bg-[#fff3e3] px-3 py-0.5 text-xs font-bold text-primary border border-primary/20">
                عميل معتمد
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span dir="ltr">{user.email}</span>
              </span>
              {user.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span dir="ltr">{user.phone}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>عضو منذ {formattedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-heading transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 shadow-2xs shrink-0 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
