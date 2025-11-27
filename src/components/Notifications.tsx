import React from 'react';
import { useStore } from '@/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

export const Notifications: React.FC = () => {
  const { notifications } = useStore();

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {notifications.map((note, i) => (
          <motion.div
            key={`${i}-${note}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-ultimate-panel border border-ultimate-border text-white px-4 py-2 rounded-md shadow-lg text-sm"
          >
            {note}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;