/* eslint-disable @typescript-eslint/no-empty-object-type */

import Image from 'next/image';
import { forwardRef } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const avatarVariants = tv({
  slots: {
    avatar: 'terminal:rounded-none relative aspect-square overflow-hidden rounded-full',
    avatarStack: 'relative horizontal child:text-foreground/40 child:ring-2 child:ring-current'
  },

  variants: {
    size: {
      xs: { avatar: 'size-2' },
      sm: { avatar: 'size-3' },
      md: { avatar: 'size-8' },
      lg: { avatar: 'size-10' },
      xl: { avatar: 'size-12' },
      '2xl': { avatar: 'size-16' },
      '3xl': { avatar: 'size-20' }
    },
    spacing: {
      tight: { avatarStack: '-space-x-6' },
      normal: { avatarStack: '-space-x-4' },
      loose: { avatarStack: '-space-x-2' }
    }
  },

  defaultVariants: {
    size: 'md'
  }
});

const { avatar, avatarStack } = avatarVariants();

export type AvatarVariants = VariantProps<typeof avatar>;

interface AvatarProps extends React.ComponentProps<'div'>, AvatarVariants {}

export const Avatar = forwardRef<HTMLDivElement, React.PropsWithChildren<AvatarProps>>(
  ({ className, children, size, ...props }, ref) => (
    <div {...props} className={avatar({ size, className })} ref={ref}>
      {children}
    </div>
  )
);

Avatar.displayName = 'Avatar';

interface AvatarImageProps extends React.ComponentProps<typeof Image>, AvatarVariants {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, width = 16, height = 16, alt = '', ...props }, ref) => (
    <Image
      referrerPolicy="no-referrer" // load images
      alt={alt}
      width={width}
      height={height}
      unoptimized
      {...props}
      className={cn('pointer-events-none aspect-square size-full select-none', className)}
      ref={ref}
    />
  )
);

AvatarImage.displayName = 'AvatarImage';

interface AvatarFallbackProps extends React.ComponentProps<'div'>, AvatarVariants {}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      className={cn(
        'flex aspect-square h-full w-auto items-center justify-center bg-muted font-medium',
        className
      )}
      ref={ref}
    />
  )
);

AvatarFallback.displayName = 'AvatarFallback';

interface AvatarComponent
  extends React.ComponentElement<AvatarProps, React.Component<AvatarProps>> {}

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStack> {
  maxAvatars?: number;
  children: AvatarComponent[];
}

export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps>(
  ({ className, children: avatars, maxAvatars = 3, ...props }, ref) => {
    if (avatars.length <= 1) return avatars;

    const shownAvatars = avatars.slice(0, maxAvatars);
    const hiddenAvatars = avatars.slice(maxAvatars);
    const { size = avatars[0].props.size, spacing = 'normal' } = props;

    return (
      <div {...props} className={avatarStack({ spacing, className })} ref={ref}>
        {shownAvatars}

        {hiddenAvatars.length ? (
          <Avatar size={size}>
            <AvatarFallback>+{hiddenAvatars.length}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    );
  }
);

AvatarStack.displayName = 'AvatarStack';
