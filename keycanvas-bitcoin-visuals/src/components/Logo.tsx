
import React from 'react';
import { Bitcoin, Key } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className,
  withText = true
}) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 28
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn('flex items-center gap-2', sizes[size], className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-keycanvas-blue rounded-md blur-sm opacity-20"></div>
        <div className="relative bg-gradient-to-br from-keycanvas-blue to-keycanvas-blue-dark p-1.5 rounded-md flex items-center justify-center">
          <Key size={iconSizes[size]} className="text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1">
          <Bitcoin size={iconSizes[size] * 0.75} className="text-keycanvas-amber" />
        </div>
      </div>
      {withText && (
        <div className={cn('font-bold flex items-center', textSizes[size])}>
          <span>Key</span>
          <span className="text-keycanvas-blue">Canvas</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
