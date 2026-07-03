
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(date: string | Date, format = 'MMM D, YYYY HH:mm'): string {
  return dayjs(date).format(format);
}

export function formatRelative(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function formatNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
}

export function formatSeverity(severity: string): { label: string; color: string; bg: string } {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    critical: { label: 'Critical', color: 'text-danger', bg: 'bg-danger/10 border-danger/30' },
    high: { label: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/30' },
    medium: { label: 'Medium', color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
    low: { label: 'Low', color: 'text-success', bg: 'bg-success/10 border-success/30' },
    info: { label: 'Info', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
  };
  return map[severity] || map.info;
}

export function formatStatus(status: string): { label: string; color: string; bg: string } {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    open: { label: 'Open', color: 'text-danger', bg: 'bg-danger/10 border-danger/30' },
    in_progress: { label: 'In Progress', color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
    resolved: { label: 'Resolved', color: 'text-success', bg: 'bg-success/10 border-success/30' },
    closed: { label: 'Closed', color: 'text-muted', bg: 'bg-muted/10 border-muted/30' },
    escalated: { label: 'Escalated', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/30' },
    pending: { label: 'Pending', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
    new: { label: 'New', color: 'text-danger', bg: 'bg-danger/10 border-danger/30' },
    acknowledged: { label: 'Acknowledged', color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
    suppressed: { label: 'Suppressed', color: 'text-muted', bg: 'bg-muted/10 border-muted/30' },
    false_positive: { label: 'False Positive', color: 'text-success', bg: 'bg-success/10 border-success/30' },
  };
  return map[status] || { label: status, color: 'text-muted', bg: 'bg-muted/10 border-muted/30' };
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadFile(content: string, filename: string, type = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
