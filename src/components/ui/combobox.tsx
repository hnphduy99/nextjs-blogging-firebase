'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useFormField } from './form';

/**
 * Props:
 * - options: danh sách [{ label, value }]
 * - value: string hoặc string[]
 * - onChange: callback khi thay đổi
 * - multiple: cho phép chọn nhiều
 * - placeholder: nội dung placeholder
 * - clearable: có nút xoá không
 * - form, name: dùng cho react-hook-form
 */
export function Combobox({
  options,
  value: controlledValue,
  onChange,
  placeholder = 'Chọn giá trị...',
  clearable = true,
  multiple = false,
  form,
  name,
  className
}: {
  options: { label: string; value: string }[];
  value?: string | string[];
  onChange?: (val: string | string[] | undefined) => void;
  placeholder?: string;
  clearable?: boolean;
  multiple?: boolean;
  form?: any;
  name?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const { error } = useFormField() || {};

  // Tích hợp react-hook-form nếu có
  const field = form?.register
    ? form.watch(name)
      ? { value: form.watch(name), onChange: (val: any) => form.setValue(name, val) }
      : { value: multiple ? [] : '', onChange: (val: any) => form.setValue(name, val) }
    : null;

  const [internalValue, setInternalValue] = React.useState<string | string[]>(multiple ? [] : '');

  const value = controlledValue ?? field?.value ?? internalValue;

  const handleSelect = (val: string) => {
    let newValue: string | string[];

    if (multiple) {
      const current = Array.isArray(value) ? [...value] : [];
      if (current.includes(val)) {
        newValue = current.filter((v) => v !== val);
      } else {
        newValue = [...current, val];
      }
    } else {
      newValue = val === value ? '' : val;
      setOpen(false);
    }

    if (onChange) onChange(newValue);
    if (field) field.onChange(newValue);
    if (!onChange && !field) setInternalValue(newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clearedValue = multiple ? [] : '';
    if (onChange) onChange(clearedValue);
    if (field) field.onChange(clearedValue);
    if (!onChange && !field) setInternalValue(clearedValue);
  };

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : [];

  const selectedLabels = options.filter((opt) => selectedValues.includes(opt.value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn('group relative w-full', className)}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              'h-full min-h-[38px] w-full justify-between pr-8',
              error && 'ring-destructive/20 dark:ring-destructive/40 border-destructive',
              multiple && 'flex-wrap py-1'
            )}
          >
            {selectedLabels.length > 0 ? (
              <div className='flex flex-wrap items-center gap-1 text-left'>
                {selectedLabels.map((item) => (
                  <span
                    key={item.value}
                    className={cn(
                      'text-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-sm',
                      multiple && 'bg-muted border-border border'
                    )}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}

            <ChevronDown
              className={cn(
                'ml-auto h-4 w-4 opacity-50 transition-opacity duration-150',
                selectedLabels.length > 0 && 'group-hover:opacity-0'
              )}
            />
          </Button>
        </PopoverTrigger>
        {clearable && selectedLabels.length > 0 && (
          <button
            type='button'
            onClick={handleClear}
            className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Tìm kiếm...' />
          <CommandEmpty>Không có kết quả</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <CommandItem key={opt.value} value={opt.value} onSelect={() => handleSelect(opt.value)}>
                  <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                  {opt.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
