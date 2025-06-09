import React from 'react';
import { motion } from 'framer-motion';
import { Upload, MessageSquare, Clock, Star, TrendingUp, FileText } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const stats = [
    { label: 'Queries Today', value: '12', icon: MessageSquare, change: '+8%' },
    { label: 'Reports Uploaded', value: '34', icon: Upload, change: '+12%' },
    { label: 'Avg Response Time', value: '2.3s', icon: Clock, change: '-15%' },
    { label: 'Accuracy Rating', value: '4.8/5', icon: Star, change: '+3%' },
  ];

  const recentQueries = [
    { id: 1, query: 'Chest X-ray interpretation for 45-year-old patient', time: '10 minutes ago', status: 'answered' },
    { id: 2, query: 'Blood work analysis - elevated white cell count', time: '25 minutes ago', status: 'answered' },
    { id: 3, query: 'MRI scan findings consultation', time: '1 hour ago', status: 'bookmarked' },
    { id: 4, query: 'Medication interaction check', time: '2 hours ago', status: 'answered' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-6 border border-teal-200/20 dark:border-teal-700/20"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning, Dr. Smith
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to assist your patients with AI-powered medical insights today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl border border-teal-200/20 dark:border-teal-700/20 hover:from-teal-500/20 hover:to-blue-500/20 transition-all">
            <Upload className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span className="font-medium text-gray-900 dark:text-white">Upload Patient Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-200/20 dark:border-purple-700/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all">
            <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-gray-900 dark:text-white">Ask AI Assistant</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-200/20 dark:border-orange-700/20 hover:from-orange-500/20 hover:to-red-500/20 transition-all">
            <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-gray-900 dark:text-white">View Query History</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Queries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Queries
        </h2>
        <div className="space-y-3">
          {recentQueries.map((query) => (
            <div
              key={query.id}
              className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/20 dark:border-gray-600/20"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {query.query}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {query.time}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                query.status === 'answered'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {query.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;