'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';

interface PopconfirmProps {
  title?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  cancelButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export default function Popconfirm({
  title = 'Confirm',
  description,
  onConfirm,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  okButtonVariant = 'default',
  cancelButtonVariant = 'outline',
  children,
  disabled = false,
  loading = false,
  side = 'top',
  align = 'center'
}: PopconfirmProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        className='border-border bg-popover text-popover-foreground data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out w-72 rounded-lg border p-0 shadow-md'
        side={side}
        align={align}
        sideOffset={8}
      >
        <PopoverPrimitive.Arrow className='fill-popover' width={16} height={8} />
        <div className='space-y-3 p-4'>
          {/* Title */}
          <div className='space-y-1'>
            <h3 className='text-sm leading-none font-semibold'>{title}</h3>
            {description && <p className='text-muted-foreground text-xs'>{description}</p>}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-2 pt-2'>
            <Button variant={cancelButtonVariant} size='sm' onClick={handleCancel} disabled={isLoading || loading}>
              {cancelText}
            </Button>
            <Button
              variant={okButtonVariant}
              size='sm'
              onClick={handleConfirm}
              disabled={isLoading || loading}
              className={isLoading || loading ? 'opacity-70' : ''}
            >
              {isLoading || loading ? (
                <>
                  <span className='mr-2 inline-block animate-spin'>⏳</span>
                  {okText}
                </>
              ) : (
                okText
              )}
            </Button>
          </div>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

Popconfirm.displayName = 'Popconfirm';
