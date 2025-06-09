import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageSquare, 
  Upload, 
  BookOpen, 
  Settings, 
  BarChart3,
  Users,
  FileText,
  Heart,
  Brain,
  Shield,
  Tag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'chat', label: 'Ask Questions', icon: MessageSquare },
    ];

    switch (user?.role) {
      case 'doctor':
        return [
          ...commonItems,
          { id: 'upload', label: 'Upload Reports', icon: Upload },
          { id: 'history', label: 'Query History', icon: FileText },
          { id: 'bookmarks', label: 'Bookmarks', icon: BookOpen },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      
      case 'researcher':
        return [
          ...commonItems,
          { id: 'datasets', label: 'Datasets', icon: Upload },
          { id: 'library', label: 'Document Library', icon: BookOpen },
          { id: 'analytics', label: 'Query Analytics', icon: BarChart3 },
          { id: 'tags', label: 'Manage Tags', icon: Tag },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      
      case 'patient':
        return [
          ...commonItems,
          { id: 'health-tips', label: 'Health Tips', icon: Heart },
          { id: 'bookmarks', label: 'Saved Answers', icon: BookOpen },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      
      case 'admin':
        return [
          ...commonItems,
          { id: 'users', label: 'Manage Users', icon: Users },
          { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
          { id: 'guidelines', label: 'Global Guidelines', icon: FileText },
          { id: 'hipaa', label: 'HIPAA Compliance', icon: Shield },
          { id: 'settings', label: 'System Settings', icon: Settings },
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-700/50'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Role Badge */}
        <div className="mt-8 p-4 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl border border-teal-200/20 dark:border-teal-700/20">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400 capitalize">
              {user?.role} Dashboard
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;