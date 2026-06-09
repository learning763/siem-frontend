import messages from "../../messages/en.json";

type RawMessages = typeof messages;

export type MessageKey = {
  [K in keyof RawMessages]: K extends "$schema"
    ? never
    : RawMessages[K] extends ""
      ? never
      : K;
}[keyof RawMessages];

function t(key: MessageKey, params?: Record<string, string | number>): string {
  const raw =
    (messages as Record<string, string>)[key as string] ?? (key as string);
  if (!params) return raw;
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
    raw,
  );
}

export const m = Object.fromEntries(
  (Object.keys(messages) as (keyof RawMessages)[])
    .filter((k) => k !== "$schema" && messages[k] !== "")
    .map((k) => [
      k,
      (params?: Record<string, string | number>) => t(k as MessageKey, params),
    ]),
) as {
  [K in MessageKey]: (params?: Record<string, string | number>) => string;
};
