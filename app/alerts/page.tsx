'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Clock4, RefreshCw } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useAlerts } from '@/hooks/useApi';
import { LoadingSpinner, ErrorMessage } from '@/components/loading-spinner';

export const dynamic = 'force-dynamic';

function SeverityBadge({ severity }) {
  const colors = {
    'Critical': 'bg-red-900 text-red-200',
    'High': 'bg-orange-900 text-orange-200',
    'Medium': 'bg-yellow-900 text-yellow-200',
    'Low': 'bg-blue-900 text-blue-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[severity] || 'bg-gray-700 text-gray-200'}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    'Active': 'bg-red-900 text-red-200',
    'Investigating': 'bg-orange-900 text-orange-200',
    'Mitigated': 'bg-green-900 text-green-200',
    'Blocked': 'bg-green-900 text-green-200',
    'Monitoring': 'bg-blue-900 text-blue-200',
    'Resolved': 'bg-gray-700 text-gray-200',
    'Pending': 'bg-yellow-900 text-yellow-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-700 text-gray-200'}`}>
      {status}
    </span>
  );
}

export default function AlertsPage() {
  const [filter, setFilter] = useState('All');
  const { data: alertsData, loading, error, refetch } = useAlerts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [simulatedAlerts, setSimulatedAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Load simulated alerts from localStorage
    const stored = localStorage.getItem('simulatedAlerts');
    if (stored) {
      try {
        setSimulatedAlerts(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse simulated alerts:', err);
      }
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const filterOptions = ['All', 'Critical', 'High', 'Medium', 'Low'];
  
  const allAlerts = useMemo(() => {
    if (!alertsData || !Array.isArray(alertsData)) {
      return simulatedAlerts;
    }
    // Combine both original alerts and simulated alerts
    return [...simulatedAlerts, ...alertsData];
  }, [alertsData, simulatedAlerts]);
  
  const filteredAlerts = useMemo(() => {
    if (!allAlerts || !Array.isArray(allAlerts)) return [];
    return filter === 'All' 
      ? allAlerts 
      : allAlerts.filter((alert: any) => alert.severity === filter);
  }, [allAlerts, filter]);

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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Alerts</h1>
              <p className="text-gray-400">Security alerts and notifications</p>
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

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 flex-wrap"
          >
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {option} {option !== 'All' && `(${allAlerts?.filter(a => a.severity === option)?.length || 0})`}
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
      ) : (
        <>
          {/* Alerts Table */}
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
                  <h3 className="text-lg font-bold">Alerts ({filteredAlerts.length})</h3>
                </div>
                {filteredAlerts.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-400">
                    {filter === 'All' ? 'No alerts' : `No ${filter.toLowerCase()} severity alerts`}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/60 border-b border-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Alert Type</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Severity</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Device</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAlerts.map((alert: any) => (
                          <tr key={alert.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
                            <td className="px-6 py-4 font-medium">{alert.type}</td>
                            <td className="px-6 py-4">
                              <SeverityBadge severity={alert.severity} />
                            </td>
                            <td className="px-6 py-4 text-gray-400">{alert.device}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={alert.status} />
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm flex items-center gap-2">
                              <Clock4 className="w-4 h-4" />
                              {alert.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
