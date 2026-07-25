"use client";

import { useCallback, useEffect } from "react";

/**
 * reCAPTCHA v3 helper. Loads the script once (lazily, shared across all forms)
 * and returns a `getToken(action)` function that resolves to a fresh token.
 *
 * When no site key is configured, `getToken` resolves to "" and the server
 * skips verification — so the site keeps working without reCAPTCHA set up.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let loadPromise: Promise<void> | null = null;

function loadRecaptcha(): Promise<void> {
  if (!SITE_KEY || typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.execute) return Promise.resolve();
  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve, reject) => {
      if (document.querySelector("script[data-recaptcha]")) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.dataset.recaptcha = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
      document.head.appendChild(script);
    });
  }
  return loadPromise;
}

export function useRecaptcha() {
  useEffect(() => {
    loadRecaptcha().catch(() => {});
  }, []);

  return useCallback(async (action: string): Promise<string> => {
    if (!SITE_KEY) return "";
    try {
      await loadRecaptcha();
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha?.execute) return "";
      await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
      return await grecaptcha.execute(SITE_KEY, { action });
    } catch {
      // Network / domain / load failure — return empty so the server can decide.
      return "";
    }
  }, []);
}
