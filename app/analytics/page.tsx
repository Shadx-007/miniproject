'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { useAnalytics } from '@/hooks/useApi';
import { LoadingSpinner, ErrorMessage } from '@/components/loading-spinner';

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const { data: analyticsData, loading, error, refetch } = useAnalytics();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Analytics</h1>
              <p className="text-gray-400">Detailed security trends and insights</p>
            </div>
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white transition-colors flex items-center gap-2 font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </motion.div>

          {/* Time Range Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 flex-wrap"
          >
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  range === timeRange
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {range}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {error && (
        <section className="px-4 md:px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <ErrorMessage message={error} onRetry={handleRefresh} />
          </div>
        </section>
      )}

      {loading ? (
        <section className="px-4 md:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <LoadingSpinner />
          </div>
        </section>
      ) : analyticsData ? (
        <>
          {/* Risk Trends */}
          <section className="px-4 md:px-6 pb-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-6">Risk Score Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.riskTrends}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="risk" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorRisk)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </section>

          {/* Device Activity */}
          <section className="px-4 md:px-6 pb-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-6">Device Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.deviceActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="active" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="inactive" fill="#6b7280" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </section>

          {/* Threat Types Distribution */}
          <section className="px-4 md:px-6 pb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-6">Threat Types Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.threatTypes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="type" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </section>
        </>
      ) : null}

      <Footer />
    </main>
  );
}
