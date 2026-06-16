"use client";
import { useEffect } from "react";

export default function ClientErrorLogger() {
  useEffect(() => {
    const onError = (ev: ErrorEvent) => {
      // Log the stack and message to console for debugging
      // You can replace this with a fetch to send logs to a server
      // if you'd like persistent recording.
      // eslint-disable-next-line no-console
      console.error("ClientErrorLogger error:", ev.message, ev.error?.stack || ev.filename + ":" + ev.lineno);
    };

    const onRejection = (ev: PromiseRejectionEvent) => {
      // eslint-disable-next-line no-console
      console.error("ClientErrorLogger unhandledrejection:", ev.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
