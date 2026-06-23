"use client";

import { useEffect, useRef } from "react";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
}

export function HubSpotForm({ portalId, formId, region = "eu1" }: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const scriptId = "hs-forms-script";

    function createForm() {
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).hbspt && containerRef.current) {
        containerRef.current.innerHTML = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#hs-form-${formId}`,
        });
      }
    }

    if (document.getElementById(scriptId)) {
      createForm();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = createForm;
    document.head.appendChild(script);
  }, [portalId, formId, region]);

  return (
    <div
      id={`hs-form-${formId}`}
      ref={containerRef}
      className="hs-form-container"
    />
  );
}
