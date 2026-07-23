"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { resendLeadEmail, updateLeadStatus } from "../../../actions";

type Status = "new" | "read" | "archived";

export default function LeadActions({
  id,
  status,
  emailSent,
}: {
  id: string;
  status: string;
  emailSent: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const setStatus = (next: Status) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await updateLeadStatus(id, next);
      if (!res.ok) setFeedback(res.error ?? "Failed to update status");
      router.refresh();
    });
  };

  const resend = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await resendLeadEmail(id);
      setFeedback(res.ok ? "Notification email sent." : `Send failed: ${res.error ?? "unknown error"}`);
      router.refresh();
    });
  };

  const STATUSES: Status[] = ["new", "read", "archived"];

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</p>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={pending}
              onClick={() => setStatus(s)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium capitalize transition disabled:opacity-50 ${
                status === s
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Notification email</p>
        <button
          type="button"
          disabled={pending}
          onClick={resend}
          className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {pending ? "Working…" : emailSent ? "Resend email" : "Retry sending email"}
        </button>
      </div>

      {feedback && <p className="text-sm font-medium text-slate-600">{feedback}</p>}
    </div>
  );
}
