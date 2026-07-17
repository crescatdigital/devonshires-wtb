import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Devonshires CMS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Devonshires CMS
          </p>
          <h1 className="mt-1.5 text-3xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-1.5 text-base leading-relaxed text-slate-500">
            Manage the Wills, Trusts &amp; Probate website content.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
