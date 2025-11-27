import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  data: number[];
  color?: string;
}

export const Sparkline: React.FC<Props> = ({ data, color = '#fbbf24' }) => {
  const chartData = data.map((val, i) => ({ i, val }));

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sparkline;