'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Shield, Zap, Clock, TrendingDown, Clock4, RefreshCw } from 'lucide-react';
import Footer from '@/components/footer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSecurity } from '@/hooks/useApi';
import { LoadingSpinner, SkeletonCard, ErrorMessage } from '@/components/loading-spinner';
import AutoSecurityTest from '@/components/auto-security-test';
import SimulationControlPanel from '@/components/simulation-control-panel';
import LiveDataStream from '@/components/live-data-stream';
import AIDecisionPanel from '@/components/ai-decision-panel';
import AutoFixPanel from '@/components/auto-fix-panel';
import AdvancedGraphs from '@/components/advanced-graphs';
import NotificationPanel from '@/components/notification-panel';
import DataInspectorPanel from '@/components/data-inspector-panel';


export const dynamic = 'force-dynamic';

function OverviewCard({ icon: Icon, title, value, subtitle, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900/60 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/80 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-blue-400" />
        {trend && <span className="text-green-400 text-xs font-medium flex items-center gap-1"><TrendingDown className="w-4 h-4" /> {trend}</span>}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
    </motion.div>
  );
}

function SeverityBadge({ severity }) {
  const colors = {
    'Critical': 'bg-red-900 text-red-200',
    'High': 'bg-orange-900 text-orange-200',
    'Medium': 'bg-yellow-900 text-yellow-200',
    'Low': 'bg-blue-900 text-blue-200',
    'Active': 'bg-red-900 text-red-200',
    'Detected': 'bg-orange-900 text-orange-200',
    'Monitoring': 'bg-gray-700 text-gray-200',
    'Blocked': 'bg-green-900 text-green-200',
    'Quarantined': 'bg-purple-900 text-purple-200',
    'Mitigated': 'bg-green-900 text-green-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[severity] || 'bg-gray-700 text-gray-200'}`}>
      {severity}
    </span>
  );
}

export default function DashboardPage() {
  const { data, loading, error, refetch } = useSecurity();
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
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Real-time security intelligence and threat monitoring</p>
            </div>
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white transition-colors flex items-center gap-2 font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </motion.button>
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

      {/* Overview Cards */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <OverviewCard icon={Shield} title="Risk Score" value={`${data.riskScore}%`} subtitle="Very Low" trend={`↓ ${Math.abs(data.riskTrend)}%`} />
              <OverviewCard icon={AlertTriangle} title="Active Alerts" value={data.activeAlerts.toString()} subtitle={`${data.criticalAlerts} Critical`} trend={`↓ ${Math.abs(data.alertsTrend)}`} />
              <OverviewCard icon={Zap} title="Devices Connected" value={data.devicesConnected.toLocaleString()} subtitle={`${data.secureDevices} Secure`} trend={`↑ ${data.devicesTrend}`} />
              <OverviewCard icon={Activity} title="Threats Blocked" value={data.threatsBlocked.toString()} subtitle="Last 24h" trend={`↑ ${data.threatsTrend}`} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Auto Security Test Section */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <AutoSecurityTest />
        </div>
      </section>

      {/* Simulation Control Panel */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <SimulationControlPanel />
        </div>
      </section>

      {/* Live Data Stream & AI Decision */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <LiveDataStream />
          <AIDecisionPanel />
        </div>
      </section>

      {/* Auto Fix Execution */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <AutoFixPanel />
        </div>
      </section>

      {/* Advanced Analytics */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <AdvancedGraphs />
        </div>
      </section>

      {/* Notifications & Data Inspector */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <NotificationPanel />
        </div>
      </section>

      {/* Data Inspector */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <DataInspectorPanel />
        </div>
      </section>

      {/* Charts Section */}
      {!loading && data && (
        <section className="px-4 md:px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threat Activity Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-6">Threat Activity (24h)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data.threatTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="threats" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Alerts by Category Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-6">Alerts by Severity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.alertsByCategory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="category" stroke="#888" />
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
          </div>
        </section>
      )}

      {/* Active Threats Panel */}
      {!loading && data && (
        <section className="px-4 md:px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="border-b border-gray-800 px-6 py-4">
                <h3 className="text-lg font-bold">Active Threats</h3>
              </div>
              {data.activeThreats.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-400">No active threats detected</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/60 border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Threat Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Affected Devices</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activeThreats.map((threat) => (
                        <tr key={threat.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
                          <td className="px-6 py-4 font-medium">{threat.type}</td>
                          <td className="px-6 py-4"><SeverityBadge severity={threat.severity} /></td>
                          <td className="px-6 py-4"><SeverityBadge severity={threat.status} /></td>
                          <td className="px-6 py-4 text-blue-400">{threat.deviceCount} device{threat.deviceCount > 1 ? 's' : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Activity Timeline */}
      {!loading && data && (
        <section className="px-4 md:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="border-b border-gray-800 px-6 py-4">
                <h3 className="text-lg font-bold">Recent Activity</h3>
              </div>
              {data.recentEvents.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-400">No recent events</div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {data.recentEvents.map((event) => (
                    <div key={event.id} className="px-6 py-4 hover:bg-gray-900/40 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium mb-1">{event.event}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><Clock4 className="w-3 h-3" /> {event.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <SeverityBadge severity={event.severity} />
                          <SeverityBadge severity={event.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
