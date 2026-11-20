import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className = "" }: ContactSectionProps) {
  return (
    <section
      aria-label="قسم التواصل ونموذج المراسلة"
      className={`py-16 sm:py-24 bg-white ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-heading">
            تواصل معنا
          </h2>
          <p className="text-sm sm:text-base text-[#9F9F9F] leading-relaxed">
            للمزيد من المعلومات حول منتجاتنا وخدماتنا، يسعدنا تواصلك معنا دائماً
            عبر البريد أو الهاتف. فريقنا جاهز لمساعدتك في أي وقت، فلا تتردد!
          </p>
        </div>

        {/* Two Columns Grid: Contact Info (Right in RTL) & Contact Form (Left in RTL) */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 lg:pr-4">
            <ContactInfo />
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7 lg:pl-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
