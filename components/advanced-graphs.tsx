'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const threatOverTimeData = [
  { time: '00:00', threats: 5 },
  { time: '02:00', threats: 8 },
  { time: '04:00', threats: 12 },
  { time: '06:00', threats: 9 },
  { time: '08:00', threats: 15 },
  { time: '10:00', threats: 22 },
  { time: '12:00', threats: 18 },
  { time: '14:00', threats: 25 },
  { time: '16:00', threats: 20 },
  { time: '18:00', threats: 16 },
];

const fixTimeData = [
  { severity: 'Critical', avgTime: 0.45, minTime: 0.2, maxTime: 0.8 },
  { severity: 'High', avgTime: 0.65, minTime: 0.3, maxTime: 1.2 },
  { severity: 'Medium', avgTime: 0.95, minTime: 0.5, maxTime: 1.5 },
  { severity: 'Low', avgTime: 1.25, minTime: 0.8, maxTime: 2.0 },
];

const attackDistributionData = [
  { type: 'DDoS', count: 45, percentage: 35 },
  { type: 'Malware', count: 32, percentage: 25 },
  { type: 'Brute Force', count: 38, percentage: 29 },
  { type: 'Phishing', count: 14, percentage: 11 },
];

const deviceRiskData = [
  { device: 'Server-01', risk: 15, incidents: 2 },
  { device: 'Server-02', risk: 8, incidents: 1 },
  { device: 'Workstation-03', risk: 45, incidents: 5 },
  { device: 'Workstation-04', risk: 22, incidents: 2 },
  { device: 'Router-01', risk: 12, incidents: 1 },
  { device: 'Workstation-05', risk: 67, incidents: 8 },
];

export default function AdvancedGraphs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 border border-gray-800 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold mb-4">Threats Over Time (24h)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={threatOverTimeData}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorThreats)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Fix Time vs Severity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 border border-gray-800 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold mb-4">Fix Time by Severity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fixTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="severity" stroke="#888" />
              <YAxis stroke="#888" label={{ value: 'Time (s)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="avgTime" fill="#10b981" name="Avg Time (s)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Risk Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 border border-gray-800 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold mb-4">Device Risk Heatmap</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deviceRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="device" stroke="#888" />
              <YAxis stroke="#888" label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="risk" fill="#ef4444" name="Risk Score" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attack Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 border border-gray-800 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold mb-4">Attack Type Distribution</h3>
          <div className="space-y-4">
            {attackDistributionData.map((attack, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">{attack.type}</span>
                  <span className="text-sm text-gray-400">{attack.count} ({attack.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${attack.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full ${
                      attack.percentage > 30
                        ? 'bg-red-500'
                        : attack.percentage > 20
                          ? 'bg-orange-500'
                          : 'bg-yellow-500'
                    }`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
