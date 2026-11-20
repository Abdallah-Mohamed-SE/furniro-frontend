import { MapPin, Plus, Check } from "lucide-react";
import type { UserAddress } from "@/types/auth";

export interface AccountAddressesTabProps {
  addresses: UserAddress[];
}

export function AccountAddressesTab({ addresses }: AccountAddressesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-heading">عناوين الشحن</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            العناوين المسجلة لتسليم طلبات الأثاث والديكور الخاصة بك.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("ميزة إضافة عنوان جديد متاحة في لوحة التحكم.")}
          className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-primary-dark cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة عنوان جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`relative rounded-xl border p-5 sm:p-6 transition-all ${
              address.isDefault
                ? "border-primary bg-[#fcf8f3] shadow-xs"
                : "border-border bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-heading text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {address.title}
              </span>
              {address.isDefault && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  افتراضي
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-heading">{address.recipientName}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {address.city}، {address.street}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              الرمز البريدي: {address.postalCode}
            </p>
            <p className="mt-2 text-xs font-mono text-muted-foreground" dir="ltr">
              {address.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
