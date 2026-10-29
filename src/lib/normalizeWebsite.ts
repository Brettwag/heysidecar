/** Accept a public website with or without a scheme; return a normalized HTTP(S) URL. */
export function normalizeWebsite(value: string): string | null {
  const input = value.trim();
  if (!input || /\s/.test(input)) return null;

  const candidate = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  if (!/^https?:\/\/[^/\\]/i.test(candidate) || candidate.includes('\\'))
    return null;

  try {
    const url = new URL(candidate);
    if (url.username || url.password || url.hostname.length > 253) return null;

    const labels = url.hostname.split('.');
    const lastLabel = labels.at(-1) ?? '';
    if (
      labels.length < 2 ||
      !labels.every((label) =>
        /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label),
      ) ||
      !/^(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i.test(lastLabel)
    )
      return null;

    return url.href;
  } catch {
    return null;
  }
}
