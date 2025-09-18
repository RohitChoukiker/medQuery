import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Database, Tag, TrendingUp, FileText, Search } from 'lucide-react';

const ResearcherDashboard: React.FC = () => {
  const stats = [
    { label: 'Datasets Uploaded', value: '23', icon: Upload, change: '+3 this month' },
    // { label: 'Documents Tagged', value: '156', icon: Tag, change: '+12 new tags' },
    { label: 'Research Queries', value: '89', icon: Search, change: '+15 this week' },
    // { label: 'Citations Found', value: '1,234', icon: FileText, change: '+45 new refs' },
  ];

  const recentDatasets = [
    { id: 1, name: 'COVID-19 Clinical Trials 2024', size: '2.3 GB', uploaded: '3 days ago', tags: ['COVID-19', 'Clinical', 'Trials'] },
    { id: 2, name: 'Cardiology Research Papers', size: '1.8 GB', uploaded: '1 week ago', tags: ['Cardiology', 'Research', 'Papers'] },
    { id: 3, name: 'Neurological Case Studies', size: '950 MB', uploaded: '2 weeks ago', tags: ['Neurology', 'Cases', 'Studies'] },
  ];

  // const trendingQueries = [
  //   { query: 'Latest mRNA vaccine efficacy studies', count: 45, trend: '+12%' },
  //   { query: 'AI applications in diagnostic imaging', count: 38, trend: '+8%' },
  //   { query: 'Personalized medicine approaches', count: 32, trend: '+15%' },
  //   { query: 'Gene therapy clinical outcomes', count: 28, trend: '+5%' },
  // ];

  // const tagCategories = [
  //   { name: 'Oncology', count: 234, color: 'bg-red-500' },
  //   { name: 'Cardiology', count: 189, color: 'bg-blue-500' },
  //   { name: 'Neurology', count: 156, color: 'bg-purple-500' },
  //   { name: 'Immunology', count: 123, color: 'bg-green-500' },
  // ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200/20 dark:border-purple-700/20"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Research Analytics Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze medical research data and discover insights with AI assistance.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className=" gap-6">
        {/* Recent Datasets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Datasets
          </h2>
          <div className="space-y-4">
            {recentDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/20 dark:border-purple-700/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {dataset.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {dataset.size}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Uploaded {dataset.uploaded}
                </p>
                <div className="flex flex-wrap gap-1">
                  {dataset.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trending Queries */}
        
      </div>

      {/* Tag Categories */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Popular Research Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tagCategories.map((category) => (
            <div
              key={category.name}
              className="p-4 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-gray-200/20 dark:border-gray-600/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.count}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                documents tagged
              </p>
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* Quick Actions */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Research Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl border border-green-200/20 dark:border-green-700/20 hover:from-green-500/20 hover:to-teal-500/20 transition-all">
            <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-gray-900 dark:text-white">Upload Dataset</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-200/20 dark:border-blue-700/20 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-900 dark:text-white">Browse Library</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-200/20 dark:border-orange-700/20 hover:from-orange-500/20 hover:to-red-500/20 transition-all">
            <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-gray-900 dark:text-white">View Analytics</span>
          </button>
        </div>
      </motion.div> */}
    </div>
  );
};

export default ResearcherDashboard;