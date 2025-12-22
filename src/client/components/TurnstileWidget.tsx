import React, { useEffect, useMemo } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function TurnstileWidget({ siteKey, onTokenChange }: TurnstileWidgetProps) {
  const containerId = useMemo(
    () => `turnstile-container-${Math.random().toString(16).slice(2)}`,
    []
  );

  useEffect(() => {
    const existingScriptTag = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
    );

    function renderWidget() {
      const containerElement = document.getElementById(containerId);
      if (!containerElement || !window.turnstile) return;

      window.turnstile.render(containerElement, {
        sitekey: siteKey,
        callback: (token: string) => onTokenChange(token),
        "expired-callback": () => onTokenChange(""),
        "error-callback": () => onTokenChange(""),
        theme: "light",
      });
    }

    if (existingScriptTag) {
      // Script already loaded
      renderWidget();
      return;
    }

    const scriptTag = document.createElement("script");
    scriptTag.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.onload = renderWidget;
    document.body.appendChild(scriptTag);

    return () => {
      // keep script for future mounts; no cleanup needed
    };
  }, [containerId, onTokenChange, siteKey]);

  return <div id={containerId} />;
}
