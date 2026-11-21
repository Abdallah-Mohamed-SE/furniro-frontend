"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import { api } from "@/lib/api";
import type { AdminContactMessage } from "@/types/admin";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{ data?: AdminContactMessage[] } | AdminContactMessage[]>(
        "/contact?limit=50"
      );
      if (res && "data" in res && Array.isArray(res.data)) {
        setMessages(res.data);
      } else if (Array.isArray(res)) {
        setMessages(res);
      } else {
        setMessages([]);
      }
    } catch {
      setFeedback({ type: "error", text: "تعذر جلب رسائل التواصل" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    setMarkingId(id);
    setFeedback(null);
    try {
      await api.patch(`/contact/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
      setFeedback({ type: "success", text: "تم تعليم الرسالة كمقروءة" });
    } catch {
      setFeedback({ type: "error", text: "فشل تحديث حالة الرسالة" });
    } finally {
      setMarkingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      if (filterType === "UNREAD") return !m.isRead;
      if (filterType === "READ") return m.isRead;
      return true;
    });
  }, [messages, filterType]);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">رسائل التواصل والعملاء</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            متابعة استفسارات ورسائل زوار ومتسوقي Furniro الواردة من صفحة اتصل بنا
          </p>
        </div>
        <button
          type="button"
          onClick={fetchMessages}
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>تحديث</span>
        </button>
      </div>

      {/* Notifications */}
      {feedback && (
        <div
          role="alert"
          className={`flex items-center gap-2 rounded-lg p-3 text-xs sm:text-sm font-semibold border ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setFilterType("ALL")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                filterType === "ALL"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الكل ({messages.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("UNREAD")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                filterType === "UNREAD"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              غير مقروء ({unreadCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("READ")}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                filterType === "READ"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              مقروء ({messages.length - unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-xl border border-border bg-white p-12 text-center text-xs text-muted-foreground">
            جاري تحميل الرسائل...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-12 text-center text-xs text-muted-foreground">
            لا توجد أي رسائل في هذا القسم.
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const dateStr = new Date(msg.createdAt).toLocaleDateString("ar-SA", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                className={`rounded-xl border p-5 shadow-2xs transition-all ${
                  msg.isRead
                    ? "border-border bg-white"
                    : "border-primary/40 bg-[#FCF8F3]/60 shadow-xs"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-heading">{msg.name}</h3>
                      {!msg.isRead ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          رسالة جديدة
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                          تمت القراءة
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5" dir="ltr">
                      {msg.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{dateStr}</span>
                    </span>

                    {!msg.isRead && (
                      <button
                        type="button"
                        disabled={markingId === msg.id}
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-white px-2.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>تعليم كمقروء</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {msg.subject && (
                    <p className="text-xs font-bold text-heading">
                      الموضوع: {msg.subject}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-black/80 leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
