import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Challenge } from '@/types';
import { Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface Props {
  challenge: Challenge;
}

export const ChallengeCard: React.FC<Props> = ({ challenge }) => {
  const { acceptChallenge } = useStore();
  const [step, setStep] = useState<'idle' | 'confirm' | 'accepted'>('idle');

  const handleAccept = () => {
    acceptChallenge();
    setStep('accepted');
    // Send API call handled by store, mock success message here
  };

  return (
    <div className="bg-ultimate-panel border border-ultimate-accent/20 rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Flame size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-ultimate-accent/20 text-ultimate-accent rounded">
            {challenge.difficulty}
          </span>
          <span className="text-xs text-ultimate-dim">Daily Quest</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
        <p className="text-sm text-ultimate-dim mb-6">
          Goal: {challenge.goalMinutes} mins focus • Reward: <span className="text-ultimate-gold">{challenge.rewardXP} XP</span>
        </p>

        <div className="h-12 relative">
          <AnimatePresence mode="wait">
            {step === 'idle' && (
              <motion.button
                key="btn-idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => setStep('confirm')}
                className="w-full bg-ultimate-panel border border-ultimate-border hover:border-ultimate-accent text-white py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                Accept Challenge
              </motion.button>
            )}

            {step === 'confirm' && (
              <motion.div
                key="step-confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-2 w-full"
              >
                <div className="flex-1 text-xs text-ultimate-accent flex items-center gap-1">
                  <ShieldAlert size={14} />
                  <span>Cost: 20 Energy</span>
                </div>
                <button
                  onClick={() => setStep('idle')}
                  className="px-4 py-2 text-xs text-ultimate-dim hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-ultimate-accent text-white text-xs font-bold rounded hover:bg-red-700"
                >
                  Confirm
                </button>
              </motion.div>
            )}

            {step === 'accepted' && (
              <motion.div
                key="step-accepted"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full flex items-center justify-center gap-2 text-green-500 font-bold"
              >
                <CheckCircle2 size={20} />
                <span>Accepted!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;