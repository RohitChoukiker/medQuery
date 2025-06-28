import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, User, LogOut, Bell, Search, Stethoscope } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import UserProfilePopup from './UserProfilePopup';

interface NavbarProps {
  showThemeToggle?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showThemeToggle = true }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-surface-light/80 dark:bg-surface-dark/80 border-b border-light-border/50 dark:border-dark-border/50 shadow-professional dark:shadow-professional-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Medical Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-blue-light dark:to-accent-blue-dark rounded-lg flex items-center justify-center shadow-medical dark:shadow-medical-dark">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-accent-blue-light dark:from-brand-400 dark:to-accent-blue-dark bg-clip-text text-transparent">
              MedQuery Agent
            </span>
            {user && (
              <span className="hidden sm:inline-flex items-center px-2 py-1 bg-brand-100/50 dark:bg-brand-900/30 rounded-full text-xs font-medium text-brand-700 dark:text-brand-300">
                Medical AI Platform
              </span>
            )}
          </div>

          {/* Medical Search Bar - Only show when authenticated */}
          {user && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search medical queries, patient records, research..."
                  className="w-full pl-10 pr-4 py-2 bg-surface-light/50 dark:bg-surface-dark/50 border border-light-border/50 dark:border-dark-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted"
                />
              </div>
            </div>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Professional Theme Toggle */}
            {showThemeToggle && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-lg hover:bg-surface-light/50 dark:hover:bg-surface-dark/50"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
            )}

            {/* Medical User Menu - Only show when authenticated */}
            {user && (
              <>
               

                {/* Medical User Profile */}
                <div className="relative flex items-center space-x-3">
                  <div 
                    ref={profileButtonRef}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 rounded-lg p-2 transition-all"
                  >
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {user?.full_name}
                      </p>
                      <p className="text-xs text-light-text-muted dark:text-dark-text-muted capitalize flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          user?.role === 'doctor' ? 'bg-brand-500' :
                          user?.role === 'researcher' ? 'bg-accent-purple-light' :
                          user?.role === 'patient' ? 'bg-accent-green-light' :
                          'bg-accent-orange-light'
                        }`}></span>
                        {user?.role}
                      </p>
                    </div>
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-blue-light dark:to-accent-blue-dark rounded-full flex items-center justify-center shadow-medical dark:shadow-medical-dark"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  
                  <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-medical-emergency transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>

                  {/* User Profile Popup */}
                  <UserProfilePopup
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    anchorRef={profileButtonRef}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;