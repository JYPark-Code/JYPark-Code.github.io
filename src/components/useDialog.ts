"use client";

import { useEffect, useRef } from "react";

// Elements that should participate in the modal's Tab cycle. Hidden-language
// duplicates ([lang] display:none) and disabled controls are filtered out at
// runtime via getClientRects(), so this stays a plain selector.
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Accessibility plumbing shared by every modal:
 *  - locks background scroll while open,
 *  - moves focus into the dialog (first control, panel as fallback),
 *  - traps Tab / Shift+Tab inside the panel,
 *  - closes on Escape,
 *  - restores focus to whatever opened it on unmount.
 *
 * Returns a ref to attach to the modal panel. The panel needs tabIndex={-1}
 * so it can receive focus as a fallback when it holds no focusable controls.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(onClose: () => void) {
  const panelRef = useRef<T>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusable = (): HTMLElement[] => {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );
    };

    // Move focus into the dialog so keyboard/assistive-tech users start inside it.
    (focusable()[0] ?? panelRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      const panel = panelRef.current;
      if (items.length === 0) {
        e.preventDefault();
        panel?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = panel?.contains(active) ?? false;

      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      // Return focus to the trigger (e.g. the project card) that opened us.
      opener?.focus?.();
    };
  }, [onClose]);

  return panelRef;
}
