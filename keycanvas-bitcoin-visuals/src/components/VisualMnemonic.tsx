
import React, { useMemo } from 'react';
import { Circle, Square, Triangle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualMnemonicProps {
  address: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Generate a deterministic color based on part of the string
const getColorFromString = (str: string, index: number): string => {
  const colors = [
    'text-keycanvas-blue', 
    'text-keycanvas-amber', 
    'text-purple-500', 
    'text-green-500'
  ];
  
  const charCode = str.charCodeAt(index % str.length);
  return colors[charCode % colors.length];
};

// Get shape based on string
const getShapeFromString = (str: string, index: number) => {
  const shapes = [Circle, Square, Triangle, Star];
  const charCode = str.charCodeAt(index % str.length);
  const ShapeComponent = shapes[charCode % shapes.length];
  return ShapeComponent;
};

const VisualMnemonic: React.FC<VisualMnemonicProps> = ({ 
  address, 
  size = 'md', 
  className 
}) => {
  // Get size classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  // Container sizes
  const containerSizes = {
    sm: 'w-24 h-12',
    md: 'w-28 h-14',
    lg: 'w-32 h-16'
  };

  // Generate a consistent visual pattern based on the address
  const pattern = useMemo(() => {
    if (!address) return [];
    
    // Take first 12 characters of address to generate pattern
    const patternKey = address.slice(0, 12);
    
    // Create 4 shapes based on different parts of the address
    return [0, 3, 6, 9].map(startIndex => {
      const segmentKey = patternKey.substring(startIndex, startIndex + 3);
      const ShapeComponent = getShapeFromString(segmentKey, 0);
      const color = getColorFromString(segmentKey, 1);
      const position = {
        x: (patternKey.charCodeAt(startIndex) % 3) * 33 + 10,
        y: (patternKey.charCodeAt(startIndex + 1) % 3) * 33 + 10,
      };
      
      return {
        key: startIndex,
        component: ShapeComponent,
        color,
        position,
      };
    });
  }, [address]);

  return (
    <div 
      className={cn(
        'relative border rounded-md bg-white/50 flex items-center justify-center',
        containerSizes[size],
        className
      )}
    >
      <div className="absolute inset-0">
        {pattern.map(({ key, component: ShapeComponent, color, position }) => (
          <div 
            key={key} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%` 
            }}
          >
            <ShapeComponent className={cn(sizeClasses[size], color)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualMnemonic;
