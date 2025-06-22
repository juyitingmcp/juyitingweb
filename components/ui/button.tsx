'use client';

import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/button';
import { cn } from '@/lib/utils';

interface ButtonProps extends HeroButtonProps {
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function Button({ 
  children, 
  className, 
  variant = 'solid',
  size = 'md',
  color = 'primary',
  ...props 
}: ButtonProps) {
  return (
    <HeroButton
      variant={variant}
      size={size}
      color={color}
      className={cn('font-medium', className)}
      {...props}
    >
      {children}
    </HeroButton>
  );
} 