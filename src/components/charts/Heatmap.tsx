import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  data: Record<string, number>;
}

export const Heatmap: React.FC<Props> = ({ data }) => {
  // Generate dummy last 14 days for visual demo
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split('T')[0];
  });

  const getIntensity = (val: number) => {
    if (!val) return 'bg-ultimate-border';
    if (val < 3) return 'bg-ultimate-accent/40';
    if (val < 6) return 'bg-ultimate-accent/70';
    return 'bg-ultimate-accent';
  };

  return (
    <div className="flex gap-1 justify-between w-full">
      {days.map((date, i) => {
        const count = data[date] || 0;
        return (
          <motion.div
            key={date}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={clsx(
              "w-full aspect-square rounded-sm cursor-pointer hover:ring-2 hover:ring-white/50 transition-all",
              getIntensity(count)
            )}
            title={`${date}: ${count} hours`}
            role="gridcell"
            aria-label={`Activity for ${date}: ${count} hours`}
          />
        );
      })}
    </div>
  );
};

export default Heatmap;