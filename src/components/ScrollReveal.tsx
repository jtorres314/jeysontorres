import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number; // ms
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  const getTransformStyle = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (direction) {
      case 'up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 28px, 0)',
        };
      case 'down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -28px, 0)',
        };
      case 'left':
        return {
          opacity: 0,
          transform: 'translate3d(28px, 0, 0)',
        };
      case 'right':
        return {
          opacity: 0,
          transform: 'translate3d(-28px, 0, 0)',
        };
      case 'none':
        return {
          opacity: 0,
          transform: 'none',
        };
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 28px, 0)',
        };
    }
  };

  return (
    <div
      ref={ref}
      style={{
        ...getTransformStyle(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
