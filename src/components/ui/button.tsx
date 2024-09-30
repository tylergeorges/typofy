import { forwardRef } from 'react';
import Link from 'next/link';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const buttonVariants = tv({
  base: cn(
    'relative inline-flex w-fit cursor-pointer items-center whitespace-nowrap rounded-lg text-center text-sm text-white transition duration-300 ease-out',
    'outline-none ring-primary focus-visible:ring-2',
    'items-center justify-center overflow-hidden align-middle font-semibold disabled:cursor-not-allowed disabled:opacity-50'
  ),

  variants: {
    color: {
      default: 'bg-primary text-primary-foreground ring-white hover:bg-primary/90',
      white: 'bg-white text-black',
      secondary:
        'bg-secondary text-muted-foreground/60 hover:bg-secondary/80 hover:text-muted-foreground',
      destructive: 'bg-destructive text-white hover:bg-destructive/60 active:bg-destructive/40',
      success: 'bg-success hover:bg-success/90 text-white'
    },

    variant: {
      default: '',
      link: 'bg-transparent hover:bg-transparent hover:underline',
      outline:
        'border border-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground',
      ghost: 'border-none bg-transparent hover:bg-secondary',
      transparent: 'bg-transparent hover:bg-transparent'
    },

    size: {
      xs: 'w-[52px] min-w-[52px] gap-1 p-1 text-xs',
      sm: 'gap-1 px-3 py-2 text-xs',
      md: 'gap-2 rounded-lg px-4 py-2 text-sm',
      lg: 'gap-3 px-6 py-2',
      xl: 'gap-2 px-6 text-base',
      icon: 'size-11 rounded-[15px] p-0 transition-none horizontal center'
    },

    active: {
      true: ''
    },

    round: {
      true: 'rounded-full'
    },

    fill: {
      true: 'w-full'
    }
  },

  defaultVariants: {
    color: 'default',
    size: 'md'
  },

  compoundVariants: [
    {
      color: 'default',
      variant: 'outline',
      className:
        'border border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
    },
    {
      color: 'destructive',
      variant: 'outline',
      className:
        'border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground'
    },
    {
      color: 'default',
      variant: 'outline',
      className: 'border border-accent bg-transparent text-primary hover:bg-accent'
    },

    {
      color: 'destructive',
      variant: 'ghost',
      className:
        'bg-transparent text-destructive hover:bg-destructive hover:text-white active:bg-destructive/90 active:text-white'
    },
    {
      color: 'default',
      variant: 'ghost',
      className: 'bg-transparent text-foreground hover:bg-foreground/10'
    },
    {
      color: 'default',
      active: true,
      variant: 'ghost',
      className: 'bg-foreground/20 hover:bg-foreground/20'
    },
    {
      color: 'default',
      active: true,
      variant: 'ghost',
      size: 'icon',
      className: 'bg-primary text-primary-foreground hover:bg-primary'
    },
    {
      color: 'default',
      variant: 'ghost',
      size: 'icon',
      active: false,
      className: 'hover:bg-transparent'
    }
  ]
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  loading?: boolean;
}

const ButtonLoadingDot = () => (
  <div className="relative size-1.5 rounded-full bg-white opacity-30" />
);

const LoadingEllipsis = () => {
  return (
    <div className="absolute flex h-full w-full gap-1 center child:animate-ellipsis [&>*:nth-child(2)]:delay-200 [&>*:nth-child(3)]:delay-100">
      <ButtonLoadingDot />
      <ButtonLoadingDot />
      <ButtonLoadingDot />
    </div>
  );
};

interface ButtonStatusLabelProps {
  loading: boolean;
  className?: string;
}

export const ButtonStatusLabel = ({
  loading,
  children,
  className
}: React.PropsWithChildren<ButtonStatusLabelProps>) => {
  return <span className={cn(className, loading && 'invisible')}>{children}</span>;
};

export const Button = forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  (
    {
      className,
      type = 'button',
      disabled,
      children,
      variant,
      color,
      loading,
      fill,
      size,
      round,
      ...props
    },
    ref
  ) => (
    <button
      {...props}
      type={type}
      className={buttonVariants({
        variant,
        color,
        round,
        fill,
        size,
        className
      })}
      disabled={loading || disabled}
      ref={ref}
    >
      {children}

      {loading && <LoadingEllipsis />}
    </button>
  )
);

Button.displayName = 'Button';

type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, 'color'> &
  ButtonVariants & {
    className?: string;
  };

export const ButtonLink = forwardRef<HTMLAnchorElement, React.PropsWithChildren<ButtonLinkProps>>(
  ({ className, children, color, variant, active, fill, round, size, ...props }, ref) => {
    return (
      <Link
        {...props}
        className={buttonVariants({
          variant,
          fill,
          round,
          active,
          color,
          size,
          className: ` ${className}`
        })}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
