'use client';

import { motion } from 'framer-motion';
import { Clock4 } from 'lucide-react';

interface TimelineData {
  detection: number;
  response: number;
  completion: number;
}

interface IncidentTimelineProps {
  timeline?: TimelineData;
  isAnimating?: boolean;
}

export default function IncidentTimeline({ timeline, isAnimating = false }: IncidentTimelineProps) {
  if (!timeline) return null;

  const maxTime = Math.max(timeline.detection, timeline.response, timeline.completion);
  const scale = 100 / maxTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mt-4"
    >
      <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <Clock4 className="w-4 h-4" />
        Incident Response Timeline
      </h4>

      <div className="space-y-6">
        {/* Detection Time */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Detection</span>
            <motion.span
              initial={isAnimating ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: timeline.detection }}
              className="text-sm font-mono text-blue-400"
            >
              {timeline.detection.toFixed(2)}s
            </motion.span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={isAnimating ? { width: 0 } : { width: `${timeline.detection * scale}%` }}
              animate={{ width: `${timeline.detection * scale}%` }}
              transition={{
                duration: isAnimating ? timeline.detection : 0,
                ease: 'linear',
              }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Response Time */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Response</span>
            <motion.span
              initial={isAnimating ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: timeline.response,
                delay: isAnimating ? timeline.detection : 0,
              }}
              className="text-sm font-mono text-yellow-400"
            >
              {timeline.response.toFixed(2)}s
            </motion.span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={isAnimating ? { width: 0 } : { width: `${timeline.response * scale}%` }}
              animate={{ width: `${timeline.response * scale}%` }}
              transition={{
                duration: isAnimating ? timeline.response : 0,
                ease: 'linear',
                delay: isAnimating ? timeline.detection : 0,
              }}
              className="h-full bg-yellow-500 rounded-full"
            />
          </div>
        </div>

        {/* Fix Completion Time */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Fix Completion</span>
            <motion.span
              initial={isAnimating ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: timeline.completion,
                delay: isAnimating ? timeline.detection + timeline.response : 0,
              }}
              className="text-sm font-mono text-green-400"
            >
              {timeline.completion.toFixed(2)}s
            </motion.span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={isAnimating ? { width: 0 } : { width: `${timeline.completion * scale}%` }}
              animate={{ width: `${timeline.completion * scale}%` }}
              transition={{
                duration: isAnimating ? timeline.completion : 0,
                ease: 'linear',
                delay: isAnimating ? timeline.detection + timeline.response : 0,
              }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Total Response Time: {(timeline.detection + timeline.response + timeline.completion).toFixed(2)}s
      </div>
    </motion.div>
  );
}
