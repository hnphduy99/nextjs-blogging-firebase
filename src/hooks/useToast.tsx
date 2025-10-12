import { Check, CircleAlert, Info, X } from 'lucide-react';
import { ExternalToast, toast } from 'sonner';
import { useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastParams extends Omit<ExternalToast, 'description'> {
  description?: string;
}

const stylesToast = ({
  title,
  description,
  toast,
  closeButton
}: {
  title?: string;
  description?: string;
  toast?: string;
  closeButton?: string;
}) => {
  return {
    toast: `!gap-x-4 ${toast}`,
    closeButton: `!bg-background !text-foreground !border-border ${closeButton}`,
    description: `!text-foreground text-sm ${description}`,
    title: `text-base ${title}`
  };
};

const baseStyles: Record<ToastType, Partial<ExternalToast>> = {
  success: {
    icon: <Check className='rounded-full bg-green-500 p-0.5 !text-white' />,
    classNames: stylesToast({ title: '!text-green-600' })
  },
  error: {
    icon: <X className='rounded-full bg-red-500 p-0.5 !text-white' />,
    classNames: stylesToast({ title: '!text-red-600' })
  },
  warning: {
    icon: <CircleAlert className='rounded-full bg-orange-500 p-0.5 !text-white' />,
    classNames: stylesToast({ title: '!text-orange-600' })
  },
  info: {
    icon: <Info className='rounded-full bg-blue-500 p-0.5 !text-white' />,
    classNames: stylesToast({ title: '!text-blue-600' })
  }
};

function createToast(type: ToastType) {
  return (message: string, descriptionOrOptions?: string | ToastParams, maybeOptions?: ToastParams) => {
    let description: string | undefined;
    let options: ToastParams | undefined;

    if (typeof descriptionOrOptions === 'string') {
      description = descriptionOrOptions;
      options = maybeOptions;
    } else {
      options = descriptionOrOptions;
    }

    toast(message, {
      description,
      ...baseStyles[type],
      ...options
    });
  };
}

export function useToast() {
  const success = useCallback(createToast('success'), []);
  const error = useCallback(createToast('error'), []);
  const warning = useCallback(createToast('warning'), []);
  const info = useCallback(createToast('info'), []);

  return { success, error, warning, info };
}
