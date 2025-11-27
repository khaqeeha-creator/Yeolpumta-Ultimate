import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChallengeCard from './ChallengeCard';
import ProgressRing from './ProgressRing';
import Heatmap from './charts/Heatmap';
import Sparkline from './charts/Sparkline';
import StudyBoard from './StudyBoard';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

export const Dashboard: React.FC = () => {
  const { fetchDashboard, dailyChallenge, user, analytics, leaderboard, isLoading } = useStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) return <div className="p-8 text-center text-ultimate-dim">Initializing System...</div>;

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Challenge */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          {dailyChallenge && <ChallengeCard challenge={dailyChallenge} />}
        </motion.div>

        {/* User Stats Ring */}
        <motion.div variants={itemVariants} className="bg-ultimate-panel border border-ultimate-border rounded-xl p-6 flex flex-col items-center justify-center">
          <ProgressRing value={0.65} label="Daily Goal" subLabel="3h 15m / 5h" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Heatmap Widget */}
        <motion.div variants={itemVariants} className="col-span-2 bg-ultimate-panel border border-ultimate-border rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase text-ultimate-dim mb-3">Consistency</h3>
          {analytics && <Heatmap data={analytics.heatmap} />}
        </motion.div>

        {/* Leaderboard Widget */}
        <motion.div variants={itemVariants} className="col-span-2 bg-ultimate-panel border border-ultimate-border rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase text-ultimate-dim mb-3">Rivals</h3>
          <div className="space-y-3">
            {leaderboard.map(entry => (
              <div key={entry.id} className="flex items-center justify-between text-sm">
                <span className="text-white w-20 truncate">{entry.name}</span>
                <Sparkline data={entry.sparkline} />
                <span className="text-ultimate-gold font-mono text-xs">{entry.xp} XP</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <StudyBoard />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;