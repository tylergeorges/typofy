'use client';

import { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { tv, VariantProps } from 'tailwind-variants';

import { Icons } from '@/components/icons';

const checkboxVariants = tv(
  {
    slots: {
      base: 'focus-visible:ring-ring peer size-5 rounded-md border-2 horizontal center focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
      indicator: 'flex items-center justify-center'
    },

    variants: {
      color: {
        default: {
          base: 'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          thumb: 'bg-white'
        },
        primary: {
          base: 'border-indigo-500 data-[state=checked]:bg-indigo-500'
        },
        success: {
          base: 'border-emerald-400 data-[state=checked]:bg-emerald-400'
        }
      }
    },

    defaultVariants: {
      color: 'default'
    }
  },
  { responsiveVariants: ['sm', 'md', 'lg'] }
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  CheckboxVariants;

const { base, indicator } = checkboxVariants();

export interface CheckboxRef extends React.ElementRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(({ color, className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={base({
      color,
      className
    })}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={indicator({ color })}>
      <Icons.Check className="aspect-square size-5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
