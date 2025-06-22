'use client';

import { Card as HeroCard, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className, shadow = 'sm', radius = 'lg', ...props }: CardProps) {
  return (
    <HeroCard
      shadow={shadow}
      radius={radius}
      className={cn('p-0', className)}
      {...props}
    >
      {children}
    </HeroCard>
  );
}

export function CardTitle({ children, className }: CardHeaderProps) {
  return (
    <CardHeader className={cn('pb-2', className)}>
      <h3 className="text-lg font-semibold">{children}</h3>
    </CardHeader>
  );
}

export function CardContent({ children, className }: CardBodyProps) {
  return (
    <CardBody className={cn('px-4 py-2', className)}>
      {children}
    </CardBody>
  );
}

export function CardActions({ children, className }: CardFooterProps) {
  return (
    <CardFooter className={cn('pt-2', className)}>
      {children}
    </CardFooter>
  );
} 