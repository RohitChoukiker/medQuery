/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Medical Professional Light Mode Colors
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          border: '#e2e8f0',
          text: {
            primary: '#1e293b',
            secondary: '#475569',
            muted: '#64748b'
          }
        },
        // Medical Professional Dark Mode Colors
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            muted: '#94a3b8'
          }
        },
        // Medical Brand Colors - Professional Medical Palette
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary medical blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Medical Accent Colors
        accent: {
          blue: {
            light: '#3b82f6',
            dark: '#60a5fa'
          },
          purple: {
            light: '#8b5cf6',
            dark: '#a78bfa'
          },
          green: {
            light: '#10b981',
            dark: '#34d399'
          },
          orange: {
            light: '#f59e0b',
            dark: '#fbbf24'
          }
        },
        // Medical Status Colors
        medical: {
          emergency: '#dc2626',
          warning: '#f59e0b',
          success: '#059669',
          info: '#0ea5e9',
          neutral: '#6b7280'
        }
      },
      backgroundColor: {
        'glass-light': 'rgba(248, 250, 252, 0.8)',
        'glass-dark': 'rgba(15, 23, 42, 0.8)',
        'surface-light': '#ffffff',
        'surface-dark': '#1e293b',
      },
      borderColor: {
        'glass-light': 'rgba(226, 232, 240, 0.5)',
        'glass-dark': 'rgba(51, 65, 85, 0.5)',
        'light-border': '#e2e8f0',
        'dark-border': '#334155',
      },
      textColor: {
        'light-text-primary': '#1e293b',
        'light-text-secondary': '#475569',
        'light-text-muted': '#64748b',
        'dark-text-primary': '#f1f5f9',
        'dark-text-secondary': '#cbd5e1',
        'dark-text-muted': '#94a3b8',
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'medical-xs': ['0.75rem', { lineHeight: '1.5' }],
        'medical-sm': ['0.875rem', { lineHeight: '1.5' }],
        'medical-base': ['1rem', { lineHeight: '1.6' }],
        'medical-lg': ['1.125rem', { lineHeight: '1.6' }],
        'medical-xl': ['1.25rem', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-medical': 'pulseMedical 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseMedical: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass-light': '0 8px 32px rgba(15, 23, 42, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'professional': '0 4px 20px rgba(15, 23, 42, 0.08)',
        'professional-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'medical': '0 8px 25px -5px rgba(14, 165, 233, 0.1), 0 8px 10px -6px rgba(14, 165, 233, 0.1)',
        'medical-dark': '0 8px 25px -5px rgba(14, 165, 233, 0.2), 0 8px 10px -6px rgba(14, 165, 233, 0.2)',
      }
    },
  },
  plugins: [],
};