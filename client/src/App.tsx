import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ChatInterface from './components/chat/ChatInterface';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import ResearcherDashboard from './components/dashboards/ResearcherDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import FileUpload from './components/common/FileUpload';

type AuthView = 'landing' | 'login' | 'signup';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Sync activeTab with current route
  React.useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path && path !== 'login' && path !== 'signup') {
      setActiveTab(path);
    }
  }, [location.pathname]);
  
  // Use React Router for navigation
  // Show authentication flow if not authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={
          <>
            <Navbar showThemeToggle={true} />
            <LoginPage 
              onBackToLanding={() => navigate('/')}
              onSwitchToSignup={() => navigate('/signup')}
            />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar showThemeToggle={true} />
            <SignupPage 
              onBackToLanding={() => navigate('/')}
              onSwitchToLogin={() => navigate('/login')}
            />
          </>
        } />
        <Route path="/" element={
          <>
            <Navbar showThemeToggle={true} />
            <LandingPage 
              onLoginClick={() => navigate('/login')}
              onSignupClick={() => navigate('/signup')}
            />
          </>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
              <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                {activeTab === 'upload' ? 'Upload Patient Reports' : 'Upload Research Datasets'}
              </h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Query History
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Bookmarked Answers
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Document Library
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Analytics Dashboard
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                User Management
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Global Guidelines
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                HIPAA Compliance
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Health Tips
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Manage Tags
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Settings
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
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
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Coming Soon
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                This feature is under development.
              </p>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={renderContent()} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/upload" element={renderContent()} />
            <Route path="/datasets" element={renderContent()} />
            <Route path="/history" element={renderContent()} />
            <Route path="/bookmarks" element={renderContent()} />
            <Route path="/library" element={renderContent()} />
            <Route path="/analytics" element={renderContent()} />
            <Route path="/users" element={renderContent()} />
            <Route path="/guidelines" element={renderContent()} />
            <Route path="/hipaa" element={renderContent()} />
            <Route path="/health-tips" element={renderContent()} />
            <Route path="/tags" element={renderContent()} />
            <Route path="/settings" element={renderContent()} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#F8FAFC',
                border: '1px solid rgba(51, 65, 85, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;