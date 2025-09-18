
import React from 'react';
import { motion } from 'framer-motion';

interface StatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const StatCard: React.FC<{ label: string; value: number; className: string }> = ({ label, value, className }) => (
  <div className={`p-4 rounded-xl flex-1 ${className}`}>
    <p className="text-sm text-white/80">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard label="Total Tasks" value={stats.total} className="bg-blue-500/30" />
      <StatCard label="Pending" value={stats.pending} className="bg-yellow-500/30" />
      <StatCard label="Completed" value={stats.completed} className="bg-green-500/30" />
    </div>
  );
};

export default Stats;
