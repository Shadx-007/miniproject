'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-3 border-gray-700 border-t-blue-400 rounded-full"
      />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-gray-800 rounded mb-4 w-1/3"></div>
      <div className="h-10 bg-gray-800 rounded mb-2"></div>
      <div className="h-4 bg-gray-800 rounded w-1/2"></div>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-red-200"
    >
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors text-sm font-medium"
      >
        Try Again
      </button>
    </motion.div>
  );
}
