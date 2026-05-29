import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('ko-KR', options ?? {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export function isZoomVisible(week: { zoom_link: string | null; zoom_visible_from: string | null; zoom_hidden_after: string | null }): boolean {
  if (!week.zoom_link) return false
  const now = new Date()
  if (week.zoom_visible_from && new Date(week.zoom_visible_from) > now) return false
  if (week.zoom_hidden_after && new Date(week.zoom_hidden_after) < now) return false
  return true
}

export function formatFileSize(bytes: number | null): string {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const COURSE_STATUS_LABEL: Record<string, string> = {
  active: '모집 중',
  closed: '마감',
  upcoming: '모집 예정',
}

export const ENROLLMENT_STATUS_LABEL: Record<string, string> = {
  active: '수강 중',
  expired: '수강 종료',
  pending: '승인 대기',
}
