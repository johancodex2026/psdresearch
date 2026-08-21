export function formatBytes(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** index;
  return `${amount >= 100 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}`;
}

export function formatRelativeTime(value?: string, now = Date.now()): string {
  if (!value) return "Nunca";
  const delta = now - new Date(value).getTime();
  const seconds = Math.max(0, Math.round(delta / 1000));
  if (seconds < 10) return "agora";
  if (seconds < 60) return `há ${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.round(hours / 24);
  return `há ${days} d`;
}

export function shortHash(value?: string, length = 12): string {
  if (!value) return "—";
  if (value.length <= length) return value;
  return `${value.slice(0, Math.floor(length / 2))}…${value.slice(-Math.ceil(length / 2))}`;
}
