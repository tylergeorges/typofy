'use client';

import { forwardRef, useRef } from 'react';

import { cn, isHexColor } from '@/lib/utils';
import { useDebounceCallback } from '@/hooks/use-debounced-callback';

interface ColorBlockProps {
  color: string;
}

const ColorBlock = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ColorBlockProps
>(({ className, color, ...props }, ref) => (
  <div className="inline-flex items-center justify-center">
    <div
      className={cn(
        'size-8 rounded-lg bg-transparent outline-2 ring-foreground focus-within:outline focus-within:ring-2',
        className
      )}
      ref={ref}
      style={{ backgroundColor: color }}
      {...props}
    />
  </div>
));

ColorBlock.displayName = 'ColorBlock';

export const ColorInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (
    {
      className,
      children,
      defaultValue ,
      onChange,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type,
      ...props
    },
    ref
  ) => {
    const currentColorRef = useRef<HTMLDivElement | null>(null);
    const colorPickerRef = useRef<HTMLInputElement | null>(null);
    const colorBlockRef = useRef<HTMLDivElement | null>(null);
    const colorLabelRef = useRef<HTMLDivElement | null>(null);

    ref = ref as React.MutableRefObject<HTMLInputElement> | null;

    const colorPickerValRef = useRef(`${defaultValue}`);

    const debouncedOnChange = useDebounceCallback(onChange ? onChange : () => {}, 500);

    const openColorPicker = () => {
      const colorPicker = colorPickerRef?.current;

      if (!colorPicker) return;

      colorPicker.focus();
      colorPicker.click();
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isHexColor(e.target.value)) return;

      const colorBlock = colorBlockRef.current;
      const currentColor = currentColorRef.current;
      const colorLabel = colorLabelRef.current;

      if (currentColor) {
        if (colorBlock) {
          colorBlock.style.backgroundColor = e.target.value;
        }

        if (colorLabel) {
          colorLabel.textContent = e.target.value;
        }
        colorPickerValRef.current = e.target.value;

        debouncedOnChange(e);
      }
    };

    const setColorInputRef = (el: HTMLInputElement | null) => {
      if (el) {
        colorPickerValRef.current = `${el.value}`;
        colorPickerRef.current = el;

        if (ref) {
          ref.current = el;
        }
      }
    };

    return (
      <button
        type="button"
        className={cn(
          'relative box-border cursor-pointer rounded-lg border-muted/50 py-2.5 text-sm font-medium text-foreground transition horizontal center-v hover:bg-muted/50',
          className
        )}
        onClick={openColorPicker}
      >
        <div className="px-2 horizontal center-v">
          <input
            type="color"
            ref={setColorInputRef}
            className="invisible absolute left-0 top-0 size-full"
            onChange={handleColorChange}
            defaultValue={defaultValue}
            {...props}
          />

          <ColorBlock ref={colorBlockRef} color={colorPickerValRef.current} />

          <div
            className="h-8 cursor-pointer px-2 text-left leading-none center-v vertical"
            ref={currentColorRef}
          >
            <div className="m-0 text-sm">{children}</div>

            <div ref={colorLabelRef} className="text-xs">
              {colorPickerValRef.current}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

ColorInput.displayName = 'ColorInput';
