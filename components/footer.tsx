'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black border-t border-gray-900 px-6 py-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4">AI Security</h3>
            <p className="text-gray-400 text-sm">
              Enterprise-grade cybersecurity for IoT infrastructure
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 AI Security. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
