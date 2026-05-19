'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Mail, ToggleLeft, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Settings {
  email: string;
  enableEmailAlerts: boolean;
  enableAutoFix: boolean;
  theme: 'dark' | 'light';
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({
    email: '',
    enableEmailAlerts: true,
    enableAutoFix: true,
    theme: 'dark',
  });
  const [saved, setSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/login');
      return;
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
  }, [router]);

  const handleSave = () => {
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-balance">
              Settings
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your preferences and security alerts
            </p>
          </motion.div>

          {/* Settings Cards */}
          <div className="space-y-6">
            {/* Email Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-3 flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Email Address</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Email address for security alerts and notifications
                  </p>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Alert Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-3 flex-shrink-0">
                  <ToggleLeft className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Email Alerts</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Receive email notifications when security anomalies are detected
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableEmailAlerts}
                      onChange={(e) =>
                        setSettings({ ...settings, enableEmailAlerts: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">
                      {settings.enableEmailAlerts ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Auto Fix Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 flex-shrink-0">
                  <ToggleLeft className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Auto Fix Enabled</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Automatically apply security fixes when anomalies are detected
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAutoFix}
                      onChange={(e) =>
                        setSettings({ ...settings, enableAutoFix: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">
                      {settings.enableAutoFix ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Theme Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/40 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-3 flex-shrink-0">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Theme</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Choose your preferred color theme
                  </p>
                  <div className="flex gap-3">
                    {(['dark', 'light'] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setSettings({ ...settings, theme })}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          settings.theme === theme
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Save Settings
            </motion.button>
            <motion.button
              onClick={() => router.push('/dashboard')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg font-semibold transition-colors border border-gray-700"
            >
              Cancel
            </motion.button>
          </motion.div>

          {/* Save Confirmation */}
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm text-center"
            >
              ✓ Settings saved successfully
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
