import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Badge, 
  Building, 
  Stethoscope, 
  Settings, 
  LogOut,
  X,
  Shield,
  Briefcase,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
}

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({ isOpen, onClose, anchorRef }) => {
  const { user, logout } = useAuth();
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Get role specific icon and color
  const getRoleDetails = (role: string) => {
    switch (role) {
      case 'doctor':
        return { 
          icon: Stethoscope, 
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          textColor: 'text-blue-700 dark:text-blue-300'
        };
      case 'researcher':
        return { 
          icon: Briefcase, 
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          textColor: 'text-purple-700 dark:text-purple-300'
        };
      case 'patient':
        return { 
          icon: Heart, 
          color: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          textColor: 'text-green-700 dark:text-green-300'
        };
      case 'admin':
        return { 
          icon: Shield, 
          color: 'from-orange-500 to-orange-600',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          textColor: 'text-orange-700 dark:text-orange-300'
        };
      default:
        return { 
          icon: User, 
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          textColor: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  const roleDetails = getRoleDetails(user.role);
  const RoleIcon = roleDetails.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          style={{ transformOrigin: 'top right' }}
        >
          {/* Header */}
          <div className="relative p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-3">
              {/* Profile Avatar */}
              <div className={`w-12 h-12 bg-gradient-to-br ${roleDetails.color} rounded-full flex items-center justify-center shadow-lg`}>
                <User className="w-6 h-6 text-white" />
              </div>
              
              {/* User Name and Role */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user.full_name}
                </h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleDetails.bgColor} ${roleDetails.textColor}`}>
                  <RoleIcon className="w-3 h-3 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="p-4 space-y-3">
            {/* Email */}
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
            </div>

            {/* User ID */}
            <div className="flex items-center space-x-3 text-sm">
              <Badge className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">ID: {user.id}</span>
            </div>

            {/* License Number (for doctors/researchers) */}
            {user.license_number && (
              <div className="flex items-center space-x-3 text-sm">
                <Badge className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  License: {user.license_number}
                </span>
              </div>
            )}

            {/* Institution */}
            {user.institution && (
              <div className="flex items-center space-x-3 text-sm">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{user.institution}</span>
              </div>
            )}

            {/* Specialization */}
            {user.specialization && (
              <div className="flex items-center space-x-3 text-sm">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{user.specialization}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <div className="space-y-1">
              {/* Settings */}
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfilePopup;