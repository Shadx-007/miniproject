'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, LogIn } from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow"
        title={isLoggedIn ? `Logged in as ${userName}` : 'Profile'}
      >
        <User className="w-5 h-5" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="text-sm font-semibold text-white truncate">{userName}</p>
                </div>

                {/* Menu Items */}
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors text-sm border-t border-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Option */}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                {/* Signup Option */}
                <Link
                  href="/login?mode=signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors text-sm border-t border-gray-800"
                >
                  <User className="w-4 h-4" />
                  Signup
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
