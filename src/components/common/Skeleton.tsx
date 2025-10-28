/**
 * Component: Skeleton
 * Purpose: Reusable loading placeholder component for any UI element
 * Props: See SkeletonProps interface below
 * 
 * @example
 * // Card skeleton
 * <Skeleton variant="card" count={3} />
 * 
 * // Avatar skeleton
 * <Skeleton variant="avatar" width={48} height={48} shape="circle" />
 * 
 * // Text skeleton
 * <Skeleton variant="text" count={5} />
 * 
 * // Custom skeleton
 * <Skeleton variant="custom" className="w-64 h-32" />
 */

import React from 'react';

// ============================================================================
// Types
// ============================================================================

type SkeletonVariant = 'card' | 'list' | 'avatar' | 'text' | 'button' | 'custom';
type SkeletonShape = 'rounded' | 'circle' | 'square';
type SkeletonAnimation = 'pulse' | 'wave';

export interface SkeletonProps {
  /** Variant type determines default layout and styling */
  variant?: SkeletonVariant;
  
  /** Width of the skeleton in pixels or Tailwind class (e.g., "w-64") */
  width?: number | string;
  
  /** Height of the skeleton in pixels or Tailwind class (e.g., "h-12") */
  height?: number | string;
  
  /** Shape modifier for the skeleton */
  shape?: SkeletonShape;
  
  /** Number of skeleton blocks to render (useful for lists) */
  count?: number;
  
  /** Animation type for the loading effect */
  animation?: SkeletonAnimation;
  
  /** Additional Tailwind classes to apply */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get default dimensions based on variant
 */
const getVariantDefaults = (variant: SkeletonVariant) => {
  const defaults = {
    card: { width: 'w-full', height: 'h-48' },
    list: { width: 'w-full', height: 'h-16' },
    avatar: { width: 'w-12', height: 'h-12' },
    text: { width: 'w-full', height: 'h-4' },
    button: { width: 'w-24', height: 'h-10' },
    custom: { width: 'w-full', height: 'h-4' },
  };
  return defaults[variant];
};

/**
 * Get shape classes based on shape prop
 */
const getShapeClass = (shape: SkeletonShape): string => {
  const shapes = {
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    square: 'rounded-none',
  };
  return shapes[shape];
};

/**
 * Get animation classes based on animation prop
 */
const getAnimationClass = (animation: SkeletonAnimation): string => {
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
  };
  return animations[animation];
};

/**
 * Convert number or string to Tailwind width/height class
 */
const toTailwindClass = (value: number | string | undefined, type: 'width' | 'height'): string => {
  if (!value) return '';
  
  // If it's already a Tailwind class, return as is
  if (typeof value === 'string' && value.startsWith(type === 'width' ? 'w-' : 'h-')) {
    return value;
  }
  
  // If it's a number, convert to Tailwind class
  if (typeof value === 'number') {
    const prefix = type === 'width' ? 'w-' : 'h-';
    // Only support common sizes, for arbitrary values use style prop
    return `${prefix}[${value}px]`;
  }
  
  return '';
};

// ============================================================================
// Component
// ============================================================================

/**
 * Skeleton Component
 * 
 * A flexible and reusable loading placeholder component that can be configured
 * for various UI elements with customizable dimensions, shapes, and animations.
 */
const Skeleton = ({
  variant = 'custom',
  width,
  height,
  shape = 'rounded',
  count = 1,
  animation = 'pulse',
  className = '',
}: SkeletonProps) => {
  // Get variant-specific defaults
  const variantDefaults = getVariantDefaults(variant);
  
  // Determine final width
  const finalWidth = width 
    ? toTailwindClass(width, 'width') 
    : variantDefaults.width;
  
  // Determine final height
  const finalHeight = height 
    ? toTailwindClass(height, 'height') 
    : variantDefaults.height;
  
  // Build base classes (using Tailwind v4 syntax)
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const shapeClass = getShapeClass(shape);
  const animationClass = getAnimationClass(animation);
  
  // Handle inline styles for arbitrary pixel values
  const getStyles = (): Record<string, string> => {
    const styles: Record<string, string> = {};
    
    if (typeof width === 'number') {
      styles.width = `${width}px`;
    }
    if (typeof height === 'number') {
      styles.height = `${height}px`;
    }
    
    return styles;
  };
  
  // Render single skeleton block
  const renderSkeletonBlock = (key: number) => {
    const shouldAddWaveOverlay = animation === 'wave';
    
    const combinedClasses = [
      baseClasses,
      shapeClass,
      animation === 'pulse' ? animationClass : '',
      finalWidth,
      finalHeight,
      shouldAddWaveOverlay ? 'relative overflow-hidden' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    
    return (
      <div
        key={key}
        className={combinedClasses}
        style={getStyles()}
        role="status"
        aria-busy="true"
        aria-label="Loading"
      >
        {shouldAddWaveOverlay && (
          <div
            className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ width: '200%' }}
          />
        )}
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  // Special handling for variant-specific layouts
  if (variant === 'card' && count > 1) {
    return (
      <div className="space-y-4" role="status" aria-busy="true">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={[
              baseClasses,
              shapeClass,
              animationClass,
              'h-48 w-full',
              className,
            ].filter(Boolean).join(' ')}
            aria-label="Loading card"
          />
        ))}
      </div>
    );
  }
  
  if (variant === 'text' && count > 1) {
    return (
      <div className="space-y-2" role="status" aria-busy="true">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={[
              baseClasses,
              shapeClass,
              animationClass,
              'h-4 w-full',
              className,
            ].filter(Boolean).join(' ')}
            style={index === count - 1 ? { width: '60%' } : {}}
            aria-label="Loading text"
          />
        ))}
      </div>
    );
  }
  
  if (variant === 'list' && count > 1) {
    return (
      <div className="space-y-3" role="status" aria-busy="true">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={[
              baseClasses,
              shapeClass,
              animationClass,
              'h-16 w-full',
              className,
            ].filter(Boolean).join(' ')}
            aria-label="Loading list item"
          />
        ))}
      </div>
    );
  }
  
  // Default rendering for single or custom skeletons
  return (
    <>
      {Array.from({ length: count }).map((_, index) => renderSkeletonBlock(index))}
    </>
  );
};

export default Skeleton;

// Export types for TypeScript users
export type { SkeletonVariant, SkeletonShape, SkeletonAnimation };

