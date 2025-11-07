import { cn } from '@/lib/utils';

export default function LabelStatus({ children, type = 'default' }: { children: React.ReactNode; type?: string }) {
  let styleClassName = 'text-gray-500 bg-gray-100';
  switch (type) {
    case 'success':
      styleClassName = 'text-green-500 bg-green-100';
      break;
    case 'warning':
      styleClassName = 'text-orange-500 bg-orange-100';
      break;
    case 'danger':
      styleClassName = 'text-red-500 bg-red-100';
      break;

    default:
      break;
  }
  return (
    <span className={cn('inline-block rounded-md px-4 py-2.5 text-sm font-medium', styleClassName)}>{children}</span>
  );
}
