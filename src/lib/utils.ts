import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tạo một slug từ một chuỗi string
 * @param str chuỗi cần tạo slug
 * @param options các tùy chọn cho hàm (mặc định là -)
 * @returns một chuỗi slug đã được tạo
 */
export function slugify(str: string, options?: { separator?: string }) {
  const sep = options?.separator ?? '-';

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, sep)
    .replace(new RegExp(`${sep}+`, 'g'), sep)
    .toLowerCase();
}

export function extractPublicId(url: string) {
  try {
    const match = url.match(/upload\/(v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/);
    if (!match) return '';
    return match[2]; // phần 2 là public_id không có extension
  } catch {
    return '';
  }
}
