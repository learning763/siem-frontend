import { useCallback, useState } from "react";

export function useCopyToClipboard(timeout: number = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
        return false;
      }
    },
    [timeout],
  );

  return { copied, copy };
}
