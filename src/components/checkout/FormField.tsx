"use client";

import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "@/types/order";

interface FormFieldProps {
  name: keyof CheckoutFormData;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
}

export function FormField({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  as = "input",
  options,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  const error = errors[name];
  const baseClass =
    "w-full rounded-xs border border-[#9F9F9F] bg-white px-4 py-3 text-sm text-[#3A3A3A] placeholder:text-[#9F9F9F] focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition-colors";
  const errorClass = "border-red-500 focus:ring-red-400";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#3A3A3A]"
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          rows={4}
          placeholder={placeholder}
          className={`${baseClass} ${error ? errorClass : ""} resize-none`}
          {...register(name)}
        />
      ) : as === "select" ? (
        <select
          id={name}
          className={`${baseClass} ${error ? errorClass : ""}`}
          {...register(name)}
        >
          <option value="">{placeholder ?? "اختر..."}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          className={`${baseClass} ${error ? errorClass : ""}`}
          {...register(name)}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 mt-0.5" role="alert">
          {String(error.message ?? "هذا الحقل مطلوب")}
        </p>
      )}
    </div>
  );
}
