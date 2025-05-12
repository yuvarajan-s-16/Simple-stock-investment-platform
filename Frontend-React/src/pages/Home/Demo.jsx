import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = () => {
  // Sample data
  const data = [
    { date: '2024-01-30', close: 187.87 },
    { date: '2024-01-26', close: 187.42 },
    { date: '2024-01-19', close: 171.48 },
    { date: '2024-01-12', close: 165.80 },
    { date: '2024-01-05', close: 159.16 },
    { date: '2023-12-29', close: 163.55 }
  ];

  return (
    <div className="stock-chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
