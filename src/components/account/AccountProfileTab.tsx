"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { User } from "@/types/user";

export interface AccountProfileTabProps {
  user: User;
  onUpdate: (updated: Partial<User>) => void;
}

export function AccountProfileTab({ user, onUpdate }: AccountProfileTabProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, phone });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-heading">البيانات الشخصية</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          يمكنك تحديث اسمك ورقم التواصل المسجل في حسابك.
        </p>
      </div>

      {savedSuccess && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800">
          <Check className="h-5 w-5" />
          <span>تم حفظ التعديلات بنجاح.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-semibold text-heading mb-1.5">
            الاسم الكامل
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm text-heading focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="profile-email" className="block text-sm font-semibold text-heading mb-1.5">
            البريد الإلكتروني (غير قابل للتعديل)
          </label>
          <input
            id="profile-email"
            type="email"
            value={user.email}
            disabled
            dir="ltr"
            className="w-full rounded-sm border border-border bg-slate-50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed text-left"
          />
        </div>

        <div>
          <label htmlFor="profile-phone" className="block text-sm font-semibold text-heading mb-1.5">
            رقم الجوال
          </label>
          <input
            id="profile-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            dir="ltr"
            placeholder="+966 50 123 4567"
            className="w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm text-heading focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
          />
        </div>

        <button
          type="submit"
          className="rounded-sm bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark cursor-pointer shadow-xs"
        >
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}
