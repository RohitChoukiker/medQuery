import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, BookOpen, TrendingUp, Activity, Shield } from 'lucide-react';
import AIMedicalAssistant from '../chat/AIMedicalAssistant';

const PatientDashboard: React.FC = () => {
  const stats = [
    { label: 'Questions Asked', value: '8', icon: MessageSquare, change: '+2 this week' },
    { label: 'Saved Answers', value: '12', icon: BookOpen, change: '3 new bookmarks' },
    { label: 'Health Score', value: '85/100', icon: Activity, change: '+5 points' },
    { label: 'Privacy Level', value: 'High', icon: Shield, change: 'All secure' },
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily for optimal health.',
      source: 'WHO Guidelines',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Regular Exercise',
      description: '30 minutes of moderate exercise can improve your overall well-being.',
      source: 'CDC Recommendations',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Balanced Diet',
      description: 'Include fruits, vegetables, and whole grains in your daily meals.',
      source: 'Mayo Clinic',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const recentQueries = [
    { id: 1, query: 'What are the symptoms of vitamin D deficiency?', time: '2 days ago', helpful: true },
    { id: 2, query: 'How to improve sleep quality naturally?', time: '5 days ago', helpful: true },
    { id: 3, query: 'Best foods for heart health', time: '1 week ago', helpful: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-200/20 dark:border-green-700/20"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Your Health Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get reliable health information and track your wellness journey.
        </p>
      </motion.div>

      {/* AI Medical Assistant Chat */}
      <AIMedicalAssistant />

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
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Health Tips Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Daily Health Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-green-200/20 dark:border-green-700/20"
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {tip.description}
              </p>
              <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                {tip.source}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-200/20 dark:border-blue-700/20 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-900 dark:text-white">Ask Health Question</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-200/20 dark:border-purple-700/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-gray-900 dark:text-white">View Saved Answers</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Queries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Recent Questions
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
                query.helpful
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-400'
              }`}>
                {query.helpful ? 'Helpful' : 'Needs Review'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;