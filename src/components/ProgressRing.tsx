import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useStore } from '@/store/useStore';

interface ProgressRingProps {
  value: number; // 0 to 1
  label: string;
  subLabel?: string;
  size?: number;
  color?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  value, 
  label, 
  subLabel,
  size = 120, 
  color = '#e11d48' 
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const { reducedMotion } = useStore();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(Math.round(value * 100));
      return;
    }

    const duration = 700;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = value * 100;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // EaseOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.round(startValue + (endValue - startValue) * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, reducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#27272a"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - value * circumference }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
            data-testid="progress-ring-circle"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-2xl font-bold" aria-label={`${displayValue} percent`}>
            {displayValue}%
          </span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-sm font-medium text-ultimate-text">{label}</div>
        {subLabel && <div className="text-xs text-ultimate-dim">{subLabel}</div>}
      </div>
    </div>
  );
};

export default ProgressRing;