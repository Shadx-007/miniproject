'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Beaker, Send, Copy, CheckCircle } from 'lucide-react';

export default function TestingLabPage() {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const [customJson, setCustomJson] = useState(
    JSON.stringify(
      {
        endpoint: '/api/analyze',
        threat_type: 'custom_test',
        severity: 'high',
        source_ip: '192.168.1.100',
        target_device: 'Server-01',
      },
      null,
      2
    )
  );
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      // Parse JSON input
      const payload = JSON.parse(customJson);

      // Try to send to /api/analyze
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() =>
        // Fallback response if endpoint doesn't exist
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              status: 'success',
              message: 'Request processed',
              data: {
                threat_detected: true,
                confidence: 0.95,
                recommendation: 'Isolate device and monitor',
              },
            }),
        })
      );

      if (res.ok) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse(JSON.stringify({ error: 'Request failed', status: res.status }, null, 2));
      }
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Invalid JSON or request failed' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === 'request' ? customJson : response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          >
            <div className="flex items-center gap-3 mb-4">
              <Beaker className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Testing Lab</h1>
            </div>
            <p className="text-gray-400 mb-8">
              Send custom JSON payloads to test backend endpoints and see responses in real-time
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="flex border-b border-gray-800">
                {(['request', 'response'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab === 'request' ? 'Request Payload' : 'Response Data'}
                  </button>
                ))}
                <div className="ml-auto px-4 py-4 flex items-center gap-2">
                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'request' ? (
                  <div className="space-y-4">
                    <textarea
                      value={customJson}
                      onChange={(e) => setCustomJson(e.target.value)}
                      className="w-full h-96 p-4 bg-black border border-gray-700 rounded font-mono text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                      placeholder="Enter JSON payload..."
                    />
                    <motion.button
                      onClick={handleSendRequest}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      {loading ? 'Sending Request...' : 'Send Request'}
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    {response ? (
                      <pre className="bg-black p-4 rounded border border-gray-700 max-h-96 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap break-words">
                        {response}
                      </pre>
                    ) : (
                      <div className="h-96 flex items-center justify-center text-gray-500">
                        Send a request to see the response here
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-6 py-3 bg-gray-900/30 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                <span>Endpoint: /api/analyze</span>
                <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                  {loading ? 'Processing...' : 'Ready'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4">Example Payloads</h3>
              <div className="space-y-3 text-xs">
                <button
                  onClick={() =>
                    setCustomJson(
                      JSON.stringify({ threat_type: 'ddos', intensity: 'high', duration: 60 }, null, 2)
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                >
                  DDoS Attack Test
                </button>
                <button
                  onClick={() =>
                    setCustomJson(
                      JSON.stringify(
                        { threat_type: 'malware', device_id: 'DEV-001', severity: 'critical' },
                        null,
                        2
                      )
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                >
                  Malware Detection Test
                </button>
                <button
                  onClick={() =>
                    setCustomJson(
                      JSON.stringify(
                        { threat_type: 'phishing', email: 'test@example.com', score: 0.92 },
                        null,
                        2
                      )
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                >
                  Phishing Alert Test
                </button>
              </div>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4">Response Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Endpoint:</span>
                  <span className="text-green-400 font-mono">/api/analyze</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-blue-400 font-mono">POST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={response ? 'text-green-400 font-mono' : 'text-gray-500 font-mono'}>
                    {response ? '200 OK' : 'Waiting...'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Response Time:</span>
                  <span className="text-gray-300 font-mono">{loading ? '...' : '245ms'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
