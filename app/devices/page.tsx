'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Search, Circle, RefreshCw } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useDevices } from '@/hooks/useApi';
import { LoadingSpinner, ErrorMessage } from '@/components/loading-spinner';

export const dynamic = 'force-dynamic';

function ActivityBadge({ level }) {
  const colors = {
    'High': 'bg-red-900 text-red-200',
    'Medium': 'bg-yellow-900 text-yellow-200',
    'Low': 'bg-blue-900 text-blue-200',
    'None': 'bg-gray-700 text-gray-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[level] || 'bg-gray-700 text-gray-200'}`}>
      {level}
    </span>
  );
}

export default function DevicesPage() {
  const [search, setSearch] = useState('');
  const { data: devicesData, loading, error, refetch } = useDevices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const filteredDevices = useMemo(() => {
    if (!devicesData || !Array.isArray(devicesData)) return [];
    return devicesData.filter((device: any) =>
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.ip.toLowerCase().includes(search.toLowerCase()) ||
      device.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [devicesData, search]);

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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Devices</h1>
              <p className="text-gray-400">Monitor connected devices and their status</p>
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

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search devices by name, IP, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
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
          {/* Devices Table */}
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
                  <h3 className="text-lg font-bold">Connected Devices ({filteredDevices.length})</h3>
                </div>
                {filteredDevices.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-400">
                    {search ? 'No devices match your search' : 'No devices found'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/60 border-b border-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Device Name</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">IP Address</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Activity</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Last Seen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDevices.map((device: any) => (
                          <tr key={device.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
                            <td className="px-6 py-4 font-medium">{device.name}</td>
                            <td className="px-6 py-4 text-gray-400 font-mono text-sm">{device.ip}</td>
                            <td className="px-6 py-4 text-gray-400">{device.type}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Circle className={`w-3 h-3 ${device.status === 'online' ? 'fill-green-400 text-green-400' : 'fill-gray-500 text-gray-500'}`} />
                                <span className={device.status === 'online' ? 'text-green-400' : 'text-gray-400'}>
                                  {device.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <ActivityBadge level={device.activity} />
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{device.lastSeen}</td>
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
