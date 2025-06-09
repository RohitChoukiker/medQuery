import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ChatInterface from './components/chat/ChatInterface';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import ResearcherDashboard from './components/dashboards/ResearcherDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import FileUpload from './components/common/FileUpload';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Show landing page if not authenticated and not showing login
  if (!isAuthenticated && !showLogin) {
    return (
      <>
        <Navbar showThemeToggle={true} />
        <LandingPage onLoginClick={() => setShowLogin(true)} />
      </>
    );
  }

  // Show login page if not authenticated but login is requested
  if (!isAuthenticated && showLogin) {
    return (
      <>
        <Navbar showThemeToggle={true} />
        <LoginPage onBackToLanding={() => setShowLogin(false)} />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        switch (user?.role) {
          case 'doctor':
            return <DoctorDashboard />;
          case 'researcher':
            return <ResearcherDashboard />;
          case 'patient':
            return <PatientDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <DoctorDashboard />;
        }
      case 'chat':
        return <ChatInterface />;
      case 'upload':
      case 'datasets':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {activeTab === 'upload' ? 'Upload Patient Reports' : 'Upload Research Datasets'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTab === 'upload' 
                  ? 'Upload patient reports and medical documents for AI analysis.'
                  : 'Upload research datasets and clinical papers for analysis.'}
              </p>
            </motion.div>
            <FileUpload />
          </div>
        );
      case 'history':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Query History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                View your previous medical queries and AI responses.
              </p>
            </motion.div>
          </div>
        );
      case 'bookmarks':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Bookmarked Answers
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Access your saved medical insights and answers.
              </p>
            </motion.div>
          </div>
        );
      case 'library':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Document Library
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and search through research documents and papers.
              </p>
            </motion.div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                View detailed analytics and insights from your queries.
              </p>
            </motion.div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                User Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users, roles, and permissions across the platform.
              </p>
            </motion.div>
          </div>
        );
      case 'guidelines':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Global Guidelines
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage hospital guidelines and medical protocols.
              </p>
            </motion.div>
          </div>
        );
      case 'hipaa':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                HIPAA Compliance
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor and ensure HIPAA compliance across all operations.
              </p>
            </motion.div>
          </div>
        );
      case 'health-tips':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Health Tips
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover daily health tips and wellness advice.
              </p>
            </motion.div>
          </div>
        );
      case 'tags':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Manage Tags
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Organize and manage document tags for better categorization.
              </p>
            </motion.div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Customize your preferences and account settings.
              </p>
            </motion.div>
          </div>
        );
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This feature is under development.
              </p>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(17, 24, 39, 0.8)',
              color: '#F9FAFB',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;