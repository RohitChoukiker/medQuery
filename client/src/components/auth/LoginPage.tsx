import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Stethoscope, Microscope, Heart, Shield, ArrowLeft, Activity } from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginPageProps {
  onBackToLanding?: () => void;
  onSwitchToSignup?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBackToLanding, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const roles = [
    { 
      id: 'doctor' as UserRole, 
      label: 'Medical Doctor', 
      icon: Stethoscope, 
      color: 'from-brand-500 to-accent-blue-light dark:to-accent-blue-dark',
      description: 'Clinical Practice & Patient Care'
    },
    { 
      id: 'researcher' as UserRole, 
      label: 'Medical Researcher', 
      icon: Microscope, 
      color: 'from-accent-purple-light to-pink-500 dark:from-accent-purple-dark dark:to-pink-400',
      description: 'Research & Clinical Studies'
    },
    { 
      id: 'patient' as UserRole, 
      label: 'Patient', 
      icon: Heart, 
      color: 'from-accent-green-light to-brand-600 dark:from-accent-green-dark dark:to-brand-500',
      description: 'Health Information & Guidance'
    },
    { 
      id: 'admin' as UserRole, 
      label: 'System Administrator', 
      icon: Shield, 
      color: 'from-accent-orange-light to-red-500 dark:from-accent-orange-dark dark:to-red-400',
      description: 'Platform Management & Analytics'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all medical credentials');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast.success(`Welcome to MedQuery Agent, ${selectedRole}!`);
      } else {
        toast.error('Invalid medical credentials');
      }
    } catch (error) {
      toast.error('Medical system login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center p-4 font-medical">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Medical Back Button */}
        {onBackToLanding && (
          <motion.button
            onClick={onBackToLanding}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            className="flex items-center space-x-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-all duration-300 p-2 rounded-lg hover:bg-surface-light/50 dark:hover:bg-surface-dark/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Medical Portal</span>
          </motion.button>
        )}

        {/* Medical Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-blue-light dark:to-accent-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medical dark:shadow-medical-dark"
          >
            <Stethoscope className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-accent-blue-light dark:from-brand-400 dark:to-accent-blue-dark bg-clip-text text-transparent mb-2">
            MedQuery Agent
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            AI-Powered Medical Intelligence Platform
          </p>
          <div className="mt-3 inline-flex items-center px-3 py-1 bg-brand-100/50 dark:bg-brand-900/30 rounded-full">
            <Activity className="w-3 h-3 text-brand-600 dark:text-brand-400 mr-1" />
            <span className="text-xs font-medium text-brand-700 dark:text-brand-300">
              Secure Medical Login
            </span>
          </div>
        </div>

        {/* Medical Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-xl rounded-2xl border border-light-border/50 dark:border-dark-border/50 shadow-medical dark:shadow-medical-dark p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medical Role Selection */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                Select Your Medical Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedRole === role.id
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20 shadow-medical dark:shadow-medical-dark'
                          : 'border-light-border dark:border-dark-border bg-surface-light/30 dark:bg-surface-dark/30 hover:border-brand-300 dark:hover:border-brand-600'
                      }`}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary block mb-1">
                        {role.label}
                      </span>
                      <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                        {role.description}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Medical Email Input */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Medical Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-3 bg-surface-light/50 dark:bg-surface-dark/50 border border-light-border/50 dark:border-dark-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted"
                required
              />
            </div>

            {/* Medical Password Input */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Secure Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  className="w-full px-4 py-3 bg-surface-light/50 dark:bg-surface-dark/50 border border-light-border/50 dark:border-dark-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all pr-12 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Medical Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-brand-500 to-accent-blue-light dark:to-accent-blue-dark text-white py-3 rounded-xl font-medium transition-all hover:shadow-medical dark:hover:shadow-medical-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-professional flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Access Medical Platform</span>
                </>
              )}
            </motion.button>

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                New to MedQuery Agent?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
                >
                  Create medical account
                </button>
              </p>
            </div>
          </form>

          {/* Medical Demo Credentials */}
          <div className="mt-6 p-4 bg-brand-50/50 dark:bg-brand-900/20 rounded-xl border border-brand-200/50 dark:border-brand-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <p className="text-sm text-brand-700 dark:text-brand-300 font-medium">Demo Medical Credentials:</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-brand-600 dark:text-brand-400">
                <strong>Email:</strong> demo@medquery.com
              </p>
              <p className="text-xs text-brand-600 dark:text-brand-400">
                <strong>Password:</strong> demo123
              </p>
              <p className="text-xs text-brand-500 dark:text-brand-500 mt-2">
                * Works with any selected medical role
              </p>
            </div>
          </div>

          {/* Medical Security Notice */}
          <div className="mt-4 p-3 bg-accent-green-light/10 dark:bg-accent-green-dark/10 rounded-lg border border-accent-green-light/20 dark:border-accent-green-dark/20">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-accent-green-light dark:text-accent-green-dark" />
              <span className="text-xs text-accent-green-light dark:text-accent-green-dark font-medium">
                HIPAA Compliant • End-to-End Encrypted • Medical Grade Security
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;