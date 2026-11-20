import { MapPin, Phone, Clock } from "lucide-react";

export interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className = "" }: ContactInfoProps) {
  return (
    <div className={`space-y-10 ${className}`.trim()}>
      {/* Address */}
      <div className="flex items-start gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-furniro-sand text-primary mt-1 shadow-xs">
          <MapPin className="h-5 w-5 fill-primary" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-semibold text-heading">
            العنوان
          </h3>
          <p className="text-sm sm:text-base text-black/80 leading-relaxed max-w-xs">
            طريق الملك فهد، حي النخيل، الرياض 12382، المملكة العربية السعودية
          </p>
          <p className="text-xs text-muted-foreground font-mono" dir="ltr">
            236 5th SE Avenue, New York NY10000, US
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-furniro-sand text-primary mt-1 shadow-xs">
          <Phone className="h-5 w-5 fill-primary" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-semibold text-heading">
            أرقام الهاتف
          </h3>
          <div className="space-y-1 text-sm sm:text-base text-black/80">
            <p className="flex items-center gap-2">
              <span>الجوال:</span>
              <span dir="ltr" className="font-sans font-medium text-black">
                +(84) 546-6789
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span>الخط الساخن:</span>
              <span dir="ltr" className="font-sans font-medium text-black">
                +(84) 456-6789
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Working Time */}
      <div className="flex items-start gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-furniro-sand text-primary mt-1 shadow-xs">
          <Clock className="h-5 w-5 stroke-primary" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-semibold text-heading">
            ساعات العمل
          </h3>
          <div className="space-y-1 text-sm sm:text-base text-black/80 leading-relaxed">
            <p>الإثنين - الجمعة: 9:00 ص - 10:00 م</p>
            <p>السبت - الأحد: 9:00 ص - 9:00 م</p>
          </div>
        </div>
      </div>
    </div>
  );
}
